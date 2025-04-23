import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  authenticateUser,
  register,
  login,
  logout,
  updateUserRole,
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
  if (req.user.newAccessToken) {
    return res
      .status(200)
      .json({ newAccessToken: req.user.newAccessToken, user: req.user.user });
  } else {
    res.status(200).json(user);
  }
});

// @desc logout the user
router.get("/logout", logout);

// @desc update user role
router.put("/update-role", updateUserRole);
export default router;
