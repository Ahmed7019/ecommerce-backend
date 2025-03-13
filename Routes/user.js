import express from "express";
import { createNewUser } from "../controllers/usersController.js";

const router = express.Router();

// @desc GET all users
// router.get("/", getProducts);

// GET using name
// router.get("/:name", getProductByName);

// GET using id
// router.get("/id/:id", getProductById);

// @desc Create a product
router.post("/", createNewUser);

// Update a product

// router.put("/id/:id", updateProductUsingId);

// Delete using ID

// router.delete("/id/:id", deleteProductUsingId);

// Delete using name
// router.delete("/:name", deleteProductUsingName);

export default router;
