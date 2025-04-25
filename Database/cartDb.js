import connection from "./connection.js";

export const addToWishlistDb = async (uid, pid) => {
  // uid -> user id
  // pid -> product id

  try {
    connection.query(`CALL addToCart(?,?)`, [uid, pid]);
  } catch (error) {
    throw new Error(error);
  }
};
