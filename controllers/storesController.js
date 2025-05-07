import multer from "multer";
import connection from "../Database/connection.js";

const upload = multer();

// @desc    Get all stores
// @route   /api/stores

export const getStores = (req, res, next) => {
  connection.query(`CALL getAllStores()`, (err, result) => {
    if (err) {
      console.log(err);
      err.status = 500;
      return next(err);
    }

    if (result.affectedRows === 0) {
      const error = new Error(`No store was found`);
      error.status = 404;
      return next(error);
    }

    res.status(200).json(result[0]);
  });
};

// @desc    Get a store by userId
// @route   /api/stores/id/:id

export const getStoreById = (req, res, next) => {
  const { id } = req.params;
  const uid = parseInt(id);
  uid &&
    connection.query(`CALL getStoreById(?)`, [uid], (err, result) => {
      if (err) {
        console.log(err);
        err.status = 500;
        return next(err);
      }
      if (!result[0] || result[0].length === 0) {
        const error = new Error(`STORE_NOT_FOUND`);
        error.status = 404;
        return next(error);
      }
      res.status(200).json(result[0]);
    });
};

// @desc    POST a store
// @route   POST /api/stores
export const createNewStore =
  (upload.array(),
  (req, res, next) => {
    // Check if request body is valid
    const { name, description, store_email, ownerId } = req.body;
    console.log(req.body);
    if (!name || !description || !store_email || !ownerId) {
      const err = new Error("Missing body fields");
      err.status = 400;
      return next(err);
    }

    connection.query(
      `CALL createNewStore(?,?,?,?)`,
      [name, description, store_email, ownerId],
      (err, result) => {
        if (err) {
          err.status = 500;
          return next(err);
        }

        res.status(200).json({ msg: "Added to DB" });
      }
    );
  });

// @desc    Update store info
// @route   PUT /api/stores/id/:id
export const updateInfo =
  (upload.any(),
  (req, res, next) => {
    const id = parseInt(req.params.id);
    if (!req.body.name || !req.body.description || !id) {
      const error = new Error("Missing field");
      error.status = 400;
      return next(error);
    }
    connection.query(
      `CALL updateStoreInfo("${req.body.name}","${req.body.description}",${id})`,
      (err, result) => {
        if (err) {
          err.status = 500;
          return next(err);
        }

        if (!result || result.affectedRows === 0) {
          const error = new Error(`Updating failed`);
          error.status = 500;
          return next(error);
        }

        res.status(200).json({ success: "Updated store successfully" });
      }
    );
  });

// @desc    DELETE a store using id
// @route   DELETE /api/stores/id

export const deleteStore = (req, res, next) => {
  const id = req.params.id;
  connection.query(`CALL deleteStore(${id})`, (err, result) => {
    if (err) {
      err.status = 500;
      return next(err);
    }
    if (result.affectedRows === 0) {
      const error = new Error(`Store with id ${id} doesn't exist`);
      error.status = 404;
      return next(error);
    }
    res.status(200).json({ msg: "Store was deleted" });
  });
};
