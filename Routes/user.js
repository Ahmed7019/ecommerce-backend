import express from "express";
import {
  // createNewUser,
  deleteUser,
  getUserById,
  updateUser,
  updateUserRole,
} from "../controllers/usersController.js";

const router = express.Router();

// @desc GET using id
router.get("/:uid", getUserById);

// @desc Create a product
// router.post("/", createNewUser);

// @desc Update user info
router.put("/update-profile", updateUser);

router.put("/update-role", updateUserRole);

// @desc delte a user
router.delete("/:uid", deleteUser);
export default router;
