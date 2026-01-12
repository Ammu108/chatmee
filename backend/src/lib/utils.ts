import type { Response } from "express";
import jwt from "jsonwebtoken";

export const generateToken = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    sameSite: "strict", // CSRF protection
    secure: process.env.NODE_ENV !== "development",
  });
};

// src/utils/normalizeUsername.ts
export const normalizeUsername = (username: string): string => {
  return username
    .toLowerCase()
    .replace(/[_\s]+/g, "") // remove spaces & underscores
    .replace(/[^a-z0-9]/g, ""); // remove special characters
};
