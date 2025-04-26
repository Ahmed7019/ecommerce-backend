import express from "express";
import {
  addToWishlist,
  getWishlist,
} from "../controllers/wishlistController.js";
// /cart
const router = express.Router();

// Add product to cart
router.post("/:productId", addToWishlist);

router.get("/:uid", getWishlist);
export default router;
