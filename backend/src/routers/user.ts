import { eq } from "drizzle-orm";
import type { Request, Response } from "express";
import { db } from "../db/index.js";
import { userTable } from "../db/schema.js";

// =================== Find Users API ( via their unique email ) ===================

export const findUserByEmail = async (req: Request, res: Response) => {
  const { email } = req.query;

  // Validate email parameter
  if (!email || typeof email !== "string") {
    return res.status(400).json({ message: "Invalid email parameter" });
  }

  try {
    // check if user with provided email exists
    const userByEmail = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email))
      .limit(1);

    if (userByEmail.length === 0) {
      return res.status(400).json({ message: "user not found!" });
    }

    // Ensure user ID exists
    if (!userByEmail[0] || !userByEmail[0].id) {
      return res.status(500).json({ message: "User data is invalid!" });
    }

    // Respond with user data excluding password
    return res.status(200).json({
      message: "user found.",
      searchedUser: {
        id: userByEmail[0].id,
        username: userByEmail[0].username,
        email: userByEmail[0].email,
      },
    });
  } catch (error) {
    console.log("Error in finding user by email", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
