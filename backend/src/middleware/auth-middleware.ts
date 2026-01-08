import { eq } from "drizzle-orm";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { db } from "../db/index.js";
import { userTable } from "../db/schema.js";

export const protectedRoute = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    // verify token with proper typing
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

    // Validate that userId exists
    if (!decoded.userId) {
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }

    // find user id from token
    const user = await db
      .select({
        id: userTable.id,
        username: userTable.username,
        email: userTable.email,
      })
      .from(userTable)
      .where(eq(userTable.id, decoded.userId))
      .limit(1);

    if (!user.length) {
      return res.status(401).json({ message: "Not authorized, user not found" });
    }

    // proceed to next middleware
    res.locals.user = user[0];
    next();
  } catch (error) {
    console.log("Error in login the account", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
