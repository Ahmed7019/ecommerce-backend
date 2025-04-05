import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  authenticateUser,
  register,
  login,
  refreshToken,
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
    uid: req.user.uid,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  };
  res.json(user);
});

// @desc refresh the token if expired
router.post("/token", refreshToken);
export default router;
