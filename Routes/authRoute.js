import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  authenticateUser,
  register,
  login,
} from "../controllers/authController.js";
const router = express.Router();
import multer from "multer";
const upload = multer();

// @desc authenticate user
router.post("/", authenticateUser);

// @desc register
router.post("/register", register);

// @desc login
router.post("/login", login);

router.get("/", authMiddleware, (req, res) => {
  const user = {
    uid: req.user.id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  };
  res.json(user);
});

export default router;
