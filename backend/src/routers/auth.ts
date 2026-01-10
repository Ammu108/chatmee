import bcrypt from "bcryptjs";
import { eq, or } from "drizzle-orm";
import type { Request, Response } from "express";
import { db } from "../db/index.js";
import { userTable } from "../db/schema.js";
import { generateToken } from "../lib/utils.js";

// =================== Check Username API ===================

export const checkusername = async (req: Request, res: Response) => {
  const { username } = req.query;

  try {
    // validate username exists and is a string
    if (!username || typeof username !== "string") {
      return res
        .status(400)
        .json({ valid: false, available: false, message: "Invalid username format." });
    }

    // regex validation
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{5,19}$/;
    // validate username input field
    if (!usernameRegex.test(username)) {
      return res
        .status(400)
        .json({ valid: false, available: false, message: "Invalid username format." });
    }

    // check that username does not already exist
    const existingUsername = await db
      .select()
      .from(userTable)
      .where(eq(userTable.username, username))
      .limit(1);

    if (existingUsername.length > 0) {
      return res.status(409).json({
        available: false,
        message: "Username already taken!",
      });
    }

    return res.status(200).json({
      available: true,
      message: "username available.",
    });
  } catch (error) {
    console.log("Error in checking username", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// =================== Signup API ===================

export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    // validate input fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // regex validation
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{5,19}$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({ message: "Invalid username format." });
    }

    // check the passowrd length
    if (password.length < 5) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // check if user with email already exists
    const existingUser = await db
      .select()
      .from(userTable)
      .where(or(eq(userTable.email, email), eq(userTable.username, username)))
      .limit(1);

    if (existingUser.length > 0) {
      return res.status(409).json({ message: "Email or username already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Store both original and normalized username
    const normalizedUsername = username.toLowerCase().trim();

    // Create new user
    const [newUser] = await db
      .insert(userTable)
      .values({
        username: username, // Original format (display)
        usernameNormalized: normalizedUsername, // Lowercase (search)
        email: email,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .returning();

    if (!newUser || !newUser.id) {
      return res.status(500).json({ message: "Failed to create user" });
    }

    // Generate JWT Token
    generateToken(newUser.id, res);

    // Respond with user data excluding password
    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log("Error in signup the account", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// =================== Login API ===================

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // validate input fields
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // check if user with provided email exists
    const user = await db.select().from(userTable).where(eq(userTable.email, email)).limit(1);

    // If user not found
    if (user.length === 0) {
      return res.status(400).json({ message: "user not exist!" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user[0]?.password || "");

    // If password does not match
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    // Ensure user ID exists
    if (!user[0] || !user[0].id) {
      return res.status(500).json({ message: "User data is invalid" });
    }

    // Generate JWT Token
    generateToken(user[0]?.id, res);

    // Respond with user data excluding password
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user[0].id,
        username: user[0].username,
        email: user[0].email,
      },
    });
  } catch (error) {
    console.log("Error in login the account", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// =================== Logout API ===================

export const logout = (_req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("Error in logout the account", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
