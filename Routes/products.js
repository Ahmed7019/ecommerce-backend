import express from "express";
import {
  getProducts,
  getProductById,
  getProductByName,
  createNewProduct,
  updateProductUsingId,
  deleteProductUsingId,
  deleteProductUsingName,
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

router.put("/id/:id", updateProductUsingId);

// Delete using ID

router.delete("/id/:id", deleteProductUsingId);

// Delete using name
router.delete("/:name", deleteProductUsingName);

export default router;
