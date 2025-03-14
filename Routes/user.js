import express from "express";
import { createNewUser, getUser } from "../controllers/usersController.js";

const router = express.Router();

// @desc GET all users
// router.get("/", getProducts);

// @desc GET using id
router.get("/:id", getUser);

// @desc Create a product
router.post("/", createNewUser);

// Update a product

// router.put("/id/:id", updateProductUsingId);

// Delete using ID

// router.delete("/id/:id", deleteProductUsingId);

// Delete using name
// router.delete("/:name", deleteProductUsingName);

export default router;
