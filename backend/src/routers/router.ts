import express from "express";
import { protectedRoute } from "../middleware/auth-middleware.js";
import { login, logout, signup } from "./auth.js";
import { findUserByEmail } from "./user.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Check authentication status
router.get("/me", protectedRoute, (_req, res) => {
  res.status(200).json({
    user: res.locals.user,
  });
});

router.get("/search", protectedRoute, findUserByEmail);

export default router;
