import { addToWishlistDb, getWishlistFromDb } from "../Database/cartDb.js";

// @desc add product to wishlist
// @route POST /cart/:proudctId

export const addToWishlist = async (req, res) => {
  const { productId } = req.params;
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

// @desc get wishlist products
// @route GET /cart/:uid

export const getWishlist = async (req, res, next) => {
  const { uid } = req.params;
  if (!uid) {
    const err = new Error("Missing uid");
    err.sendStatus(400);
    return next(err);
  }
  try {
    const data = await getWishlistFromDb(uid);
    res.json(data);
  } catch (error) {
    console.error(error);
  }
};
