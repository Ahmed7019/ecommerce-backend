import express from "express";
import { addToWishlist } from "../controllers/wishlistController.js";

const router = express.Router();

// Add product to cart
router.post("/:productId", addToWishlist);

export default router;
