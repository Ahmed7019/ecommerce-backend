import express from "express";
import {
  createNewUser,
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/usersController.js";

const router = express.Router();

// @desc GET all users
// router.get("/", getProducts);

// @desc GET using id
router.get("/:id", getUser);

// @desc Create a product
router.post("/", createNewUser);

// @desc Update a user
router.put("/:id", updateUser);

// @desc delte a user
router.delete("/:id", deleteUser);
export default router;
