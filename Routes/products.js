import express from "express";
import {
  getProducts,
  getProductById,
  getProductByName,
  createNewProduct,
  updateProductUsingId,
  deleteProductUsingId,
} from "../controllers/productsController.js";
const router = express.Router();

// GET all products
router.get("/", getProducts);

// GET using name
router.get("/:name", getProductByName);

// GET using id
router.get("/id/:id", getProductById);

// POST a product
router.post("/", createNewProduct);

// Update a product

router.put("/", updateProductUsingId);

// Delete using ID

router.delete("/", deleteProductUsingId);

export default router;
