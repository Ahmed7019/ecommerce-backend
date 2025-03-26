import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { authenticateUser, register } from "../controllers/authController.js";
const router = express.Router();

// @desc authenticate user
router.post("/", authenticateUser);

// @desc register
router.post("/register", register);

router.get("/", authMiddleware, (req, res) => {
  const user = {
    name: req.user.username,
    email: req.user.email,
    role: req.user.role,
  };
  res.json(user);
});

export default router;
