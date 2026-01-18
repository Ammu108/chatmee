import { and, eq, inArray, like, or } from "drizzle-orm";
import type { Request, Response } from "express";
import { db } from "../db/index.js";
import { conversationTable, messageTable, userTable } from "../db/schema.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import { normalizeUsername } from "../lib/utils.js";

// =================== Find Users API ( via their unique email ) ===================

export const searchUsers = async (req: Request, res: Response) => {
  const { username } = req.query;

  // Validate email parameter
  if (!username || typeof username !== "string") {
    return res.status(400).json({ message: "Invalid username parameter" });
  }

  try {
    // Normalize search input (SAME AS SIGNUP)
    const normalizedSearch = normalizeUsername(username);

    const userByUsername = await db
      .select()
      .from(userTable)
      .where(like(userTable.usernameNormalized, `%${normalizedSearch}%`))
      .limit(10);

    if (userByUsername.length === 0) {
      return res.status(404).json({ message: "user not found!" });
    }

    // Map all found users to the response format
    const users = userByUsername.map((user) => ({
      message: "user found.",
      searchedUser: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    }));

    // Respond with array of users excluding password
    return res.status(200).json(users);
  } catch (error) {
    console.log("Error in finding user by username!", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// =================== Fetch Receiver Details For UI Based On Their ID ===================

export const fetchReceiverDetails = async (req: Request, res: Response) => {
  const { receiverId } = req.params;

  try {
    // validate receiver id
    if (!receiverId) {
      return res.status(400).json({ message: "Inappropriate receiver id!" });
    }

    // verify that user must exist
    const receiverDetails = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, receiverId))
      .limit(1);

    if (receiverDetails.length === 0) {
      return res.status(400).json({ message: "receiver not found!" });
    }

    // ensure receiverID exist
    if (!receiverDetails[0] || !receiverDetails[0].id) {
      return res.status(500).json({ message: "receiver data is invalid" });
    }

    // respond with the necessary data
    return res.status(200).json({
      message: "receiver found",
      receiverData: {
        id: receiverDetails[0].id,
        username: receiverDetails[0].username,
        email: receiverDetails[0].email,
      },
    });
  } catch (error) {
    console.log("Error in fetching the receiver details!", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// =================== Send Messages One To One ===================

export const sendMessage = async (req: Request, res: Response) => {
  const senderId = req.user?.id;
  const { receiverId, content } = req.body;

  try {
    // validate user message
    if (!senderId || !receiverId || !content) {
      return res.status(400).json({ message: "Invalid request data." });
    }

    if (senderId === receiverId) {
      return res.status(400).json({ message: "Cannot message yourself" });
    }

    // verify receiver exists
    const receiver = await db
      .select({ id: userTable.id })
      .from(userTable)
      .where(eq(userTable.id, receiverId))
      .limit(1);

    if (receiver.length === 0) {
      return res.status(404).json({ message: "Receiver not found!" });
    }

    // 1️⃣  SORT user ids (VERY IMPORTANT)
    const [userOneId, userTwoId] =
      senderId < receiverId ? [senderId, receiverId] : [receiverId, senderId];

    // find existing conversations
    const conversation = await db
      .select()
      .from(conversationTable)
      .where(
        and(
          eq(conversationTable.user_one_id, userOneId),
          eq(conversationTable.user_two_id, userTwoId),
        ),
      )
      .limit(1);

    let conversationId: string;

    // 3️⃣ Create conversation if not exists
    if (conversation.length === 0) {
      const [newConversation] = await db
        .insert(conversationTable)
        .values({ user_one_id: userOneId, user_two_id: userTwoId })
        .returning();

      if (!newConversation?.id) {
        return res.status(500).json({ message: "Failed to create conversation" });
      }
      conversationId = newConversation.id;
    } else {
      if (!conversation[0]?.id) {
        return res.status(500).json({ message: "Failed to retrieve conversation" });
      }
      conversationId = conversation[0].id;
    }

    // 4️⃣ Insert message
    const [newMessage] = await db
      .insert(messageTable)
      .values({ conversation_id: conversationId, sender_id: senderId, content })
      .returning();

    // 7️⃣ Update conversation metadata
    await db
      .update(conversationTable)
      .set({ lastMessage: content, lastMessageAt: new Date() })
      .where(eq(conversationTable.id, conversationId));

    // 8️⃣ Emit to BOTH users in the conversation
    const receiverSocketId = getReceiverSocketId(receiverId);
    const senderSocketId = getReceiverSocketId(senderId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("new-message", {
        conversationId,
        message: newMessage,
      });
    }

    if (senderSocketId) {
      io.to(senderSocketId).emit("new-message", {
        conversationId,
        message: newMessage,
      });
    }

    // 9️⃣ Response
    return res.status(201).json({
      message: "Message sent successfully",
      conversationId,
      data: newMessage,
    });
  } catch (error) {
    console.log("Error in sending the messages!", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// =================== Fetch Messages Between Two Users ===================

export const fetchMessages = async (req: Request, res: Response) => {
  const senderId = req.user?.id;
  const { receiverId } = req.params;

  // validate user message
  if (!senderId || !receiverId) {
    return res.status(400).json({ message: "Invalid request data." });
  }

  try {
    // Sort user ids
    const [userOneId, userTwoId] =
      senderId < receiverId ? [senderId, receiverId] : [receiverId, senderId];

    // find conversation
    const conversation = await db
      .select()
      .from(conversationTable)
      .where(
        and(
          eq(conversationTable.user_one_id, userOneId),
          eq(conversationTable.user_two_id, userTwoId),
        ),
      )
      .limit(1);

    if (conversation.length === 0) {
      return res.status(200).json({
        conversationId: null,
        message: [],
      });
    }

    const conversationId = conversation[0]?.id;

    if (!conversationId) {
      return res.status(500).json({ message: "Invalid conversation data" });
    }

    // Fetch Messages
    const messages = await db
      .select()
      .from(messageTable)
      .where(eq(messageTable.conversation_id, conversationId))
      .orderBy(messageTable.createdAt);

    return res.status(200).json({
      conversationId,
      messages,
    });
  } catch (error) {
    console.log("Error in fetching the messages!", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// =================== Fetch Conversation Between Two Users ===================

export const fetchConversation = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  // validate userId
  if (!userId) {
    return res.status(400).json({ message: "User ID is invalid!" });
  }

  try {
    // fetch conversations
    const conversations = await db
      .select()
      .from(conversationTable)
      .where(
        or(
          eq(conversationTable.user_one_id, userId),
          eq(conversationTable.user_two_id, userId),
        ),
      );

    // handle if no conversation exist
    if (conversations.length === 0) {
      return res.status(200).json({ conversations: [] });
    }

    // now check who is participant
    const receiverIds = conversations.map((conv) =>
      conv.user_one_id === userId ? conv.user_two_id : conv.user_one_id,
    );

    // now get receiver details
    const receiverDetails = await db
      .select({
        id: userTable.id,
        username: userTable.username,
      })
      .from(userTable)
      .where(inArray(userTable.id, receiverIds));

    // final sidebar ready response
    const result = conversations.map((conv) => {
      const receiverId = conv.user_one_id === userId ? conv.user_two_id : conv.user_one_id;

      const receiver = receiverDetails.find((user) => user.id === receiverId);

      return {
        id: conv.id,
        receiver: receiver,
        lastMessage: conv.lastMessage,
        lastMessageAt: conv.lastMessageAt,
      };
    });

    return res.status(200).json({
      result,
    });
  } catch (error) {
    console.log("Error in fetching the conversation!", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
