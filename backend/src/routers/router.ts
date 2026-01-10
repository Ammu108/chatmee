import express from "express";
import { protectedRoute } from "../middleware/auth-middleware.js";
import { checkusername, login, logout, signup } from "./auth.js";
import { fetchReceiverDetails, findUserByUsername, sendMessage } from "./user.js";

const router = express.Router();

router.get("/checkusername", checkusername);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Check authentication status
router.get("/me", protectedRoute, (_req, res) => {
  res.status(200).json({
    user: res.locals.user,
  });
});

router.get("/checkusers", protectedRoute, findUserByUsername);
router.get("/chat/:receiverId", protectedRoute, fetchReceiverDetails);

router.post("/sendmessage", protectedRoute, sendMessage);

export default router;
