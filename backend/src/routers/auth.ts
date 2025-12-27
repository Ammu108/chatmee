
import type { Request, Response } from "express";
import { db } from "../db/index.js";
import { userTable } from "../db/user-schema.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudiary.js";

export const signup = async (req: Request, res: Response) => {

    const { fullName, email, password } = req.body;

    try {

        // validate input fields
        if( !fullName || !email || !password ){
            return res.status(400).json({ message: "All fields are required" });
        }

        // check the passowrd length
        if( password.length < 6 ){
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        // check if user with email already exists
        const existingUser = await db.select().from(userTable).where(eq(userTable.email, email)).limit(1);

        if( existingUser.length > 0 ){
            return res.status(400).json({ message: "User with this email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const [newUser] = await db.insert(userTable).values({
            fullName: fullName,
            email: email,
            password: hashedPassword,
            profilePicture: "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }).returning()

        if ( !newUser || !newUser.id ) {
            return  res.status(500).json({ message: "Failed to create user" });
        }

        // Generate JWT Token
        generateToken(newUser.id, res);

        // Respond with user data excluding password
        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser.id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePicture: newUser.profilePicture,
            }
        })

        
    } catch (error) {
        console.log("Error in signup the account", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {

        // validate input fields
        if( !email || !password ){
            return res.status(400).json({ message: "All fields are required" });
        }
        // check if user with email exists
        const user = await db.select().from(userTable).where(eq(userTable.email, email)).limit(1);

        // If user not found
        if(!user){
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user[0]?.password || "");

        // If password does not match
        if(!isPasswordValid){
            return res.status(400).json({ message: "Invalid email or password" });
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
                fullName: user[0].fullName,
                email: user[0].email,
                profilePicture: user[0].profilePicture,
            }
        })

    } catch (error) {
        console.log("Error in login the account", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const logout = (req: Request, res: Response) => {
    try {

        res.cookie('token', '',{maxAge: 0, httpOnly: true});
        return res.status(200).json({ message: "Logout successful" });

        
    } catch (error) {
        console.log("Error in logout the account", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const updateProfile = async ( req: Request, res: Response ) => {
    try {

        const { profilePicture } = req.body;
        const userId = res.locals.user.id;

        if(!profilePicture){
            return res.status(400).json({ message: "Profile picture is required" });
        }

        // Update user profile picture
        const response = await cloudinary.uploader.upload(profilePicture, {
            folder: "profile_pictures",
        });
        // Update user in database
        const [updatedUser] = await db.update(userTable).set({profilePicture: response.secure_url}).where(eq(userTable.id, userId)).returning();

        return res.status(200).json({
            message: "Profile picture updated successfully",
            user: updatedUser
        })
    
    } catch (error) {
        console.log("Error in updating profile picture", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const checkAuth = ( req: Request, res: Response ) => {
    try {

        res.status(200).json({
            message: "User is authenticated",
            user: res.locals.user
        })
        
    } catch (error) {
        console.log("Error in checking authentication", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}