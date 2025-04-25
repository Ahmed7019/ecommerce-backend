import { addToWishlistDb } from "../Database/cartDb.js";

// @desc add product to wishlist
// @route POST /product/id
export const addToWishlist = async (req, res) => {
  const { productId } = req.params;
  console.log(req.headers);
  const { userId } = req.body;
  if (!productId || !userId) console.log("Big error");

  try {
    await addToWishlistDb(userId, productId);
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
