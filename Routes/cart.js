import express from "express";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController.js";
// /cart
const router = express.Router();

// Add product to cart
router.post("/:productId", addToWishlist);

// Get products from the database
router.get("/:uid", getWishlist);

// Delete from wishlist
router.delete("/:productId", removeFromWishlist);

export default router;
