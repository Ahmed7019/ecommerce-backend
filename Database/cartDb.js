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

export const getWishlistFromDb = async (uid) => {
  try {
    return new Promise((resolve, reject) => {
      connection.query("CALL getWishlist(?)", [uid], (err, res) => {
        if (!res) return reject({ error: "Not found in db" });
        if (err) return reject({ err });
        resolve(res[0].flat());
      });
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const removeFromWishlistDb = async (uid, pid) => {
  try {
    return new Promise((resolve, reject) => {
      connection.query(
        "call removeFromWishlist(?,?)",
        [uid, pid],
        (err, result) => {
          if (err) return reject(err);

          return resolve(result.flat()[0]);
        }
      );
    });
  } catch (error) {}
};
