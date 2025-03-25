import express from "express";
import AuthService from "../service/authService.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", (req, res) => {
  const { email, name, role } = req.body;
  const user = { email: email, username: name, role: role };
  const accessToken = AuthService.generateToken(user);
  res.json({ accessToken: accessToken });
});

router.get("/", authMiddleware, (req, res) => {
  const user = {
    name: req.user.username,
    email: req.user.email,
    role: req.user.role,
  };
  res.json(user);
});

export default router;
