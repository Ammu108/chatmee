import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { db } from "../db/index.js";
import { userTable } from "../db/user-schema.js";
import { eq } from "drizzle-orm";

export const protectRoute = async ( req: Request, res: Response, next: NextFunction ) => {
    try {

        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({ message: "Not authorized, token missing" });
        }

        // verfy token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

        if(!decoded){
            return  res.status(401).json({ message: "Not authorized, token invalid" });
        }

        // find user id from token
        const user = await db.select({
            id: userTable.id,
            fullName: userTable.fullName,
            email: userTable.email,
            profilePicture: userTable.profilePicture,
        }).from(userTable).where(eq(userTable.id, decoded.userId)).limit(1);

        if(!user){
            return res.status(401).json({ message: "Not authorized, user not found" });
        }

        // proceed to next middleware
        res.locals.user = user[0];
        next();

    } catch (error) {
        console.log("Error in login the account", error);
        res.status(500).json({message: "Internal Server Error"});
    }
} 