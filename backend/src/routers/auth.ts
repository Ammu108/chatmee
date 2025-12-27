
import type { Request, Response } from "express";

export const login = (req: Request, res: Response) => {
    res.send('Login Page from auth router');
}

export const signup = (req: Request, res: Response) => {
    res.send('Signup Page from auth router');
}

export const logout = (req: Request, res: Response) => {
    res.send('Logout Page from auth router');
}