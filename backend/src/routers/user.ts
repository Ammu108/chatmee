import { eq, like } from "drizzle-orm";
import type { Request, Response } from "express";
import { db } from "../db/index.js";
import { messageTable, userTable } from "../db/schema.js";
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
    console.log("Error in finding user by username", error);
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
    console.log("Error in finding user by email", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// =================== Find User Messages based On Their ID ===================

export const sendMessage = async (req: Request, res: Response) => {
  const { senderId, receiverId, content } = req.body;

  try {
    // validate user message
    if (!senderId || !receiverId || !content) {
      return res
        .status(400)
        .json({ message: "Missing required fields: senderId, receiverId, or content!" });
    }

    // verify that receiver is exist
    const [receiver] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, receiverId))
      .limit(1);

    if (!receiver) {
      return res.status(404).json({ message: "Recipient user not found!" });
    }
    // Insert message into the database
    const [newMessages] = await db
      .insert(messageTable)
      .values({
        sender_id: senderId,
        receiver_id: receiverId,
        content: content,
      })
      .returning();

    return res.status(201).json({
      messages: "message sent and stored in db.",
      data: newMessages,
      receiverDetail: {
        name: receiver.username,
        email: receiver.email,
      },
    });
  } catch (error) {
    console.log("Error in finding user by email", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
