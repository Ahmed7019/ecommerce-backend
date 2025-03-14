import express from "express";
import {
  createNewUser,
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

export default router;
