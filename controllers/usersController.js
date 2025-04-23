import connection from "../Database/connection.js";

import bcrypt from "bcrypt";

// @desc    Get the user using id
// @route   GET /api/user/id
export const getUserById = (req, res, next) => {
  const { uid } = req.params;
  const id = parseInt(uid);

  if (isNaN(id)) {
    const err = new Error("Invalid id");
    err.status = 400;
    return next(err);
  }

  connection.query("CALL getUserById(?)", [id], (err, result) => {
    if (err) return err;

    if (result.affectedRows === 0) {
      const error = new Error(`User with id ${id} doesn't exist`);
      error.status = 404;
      return next(error);
    }

    res.status(200).json(result[0]);
  });
};

//  @desc     Update an existing user
//  @route    PUT  / api/user/:id

export const updateUser = async (req, res, next) => {
  const { uid, name, password, phone } = req.body;

  if (!uid || !name || !password || !phone) {
    const error = new Error("Missing fields");
    error.status = 400;
    return next(error);
  }
  const hash = await bcrypt.hash(password, 10);

  connection.query(
    `
    CALL updateUser(?,?,?,?)
    `,
    [uid, name, hash, phone],
    (err, result) => {
      if (err) {
        return next(err);
      }
      if (result.affectedRows === 0) {
        const error = new Error(`wrong id`);
        error.status = 404;
        return next(error);
      }
      res.status(200).json({ msg: "User updated successfully" });
    }
  );
};


// @desc    Delete user
// @route   DELETE /api/user/:id
export const deleteUser = (req, res, next) => {
  const { uid } = req.params;
  const id = parseInt(uid);

  // Validate id
  if (isNaN(id)) {
    const err = new Error(`Invalid id`);
    err.status = 400; //bad request
    return next(err);
  }
  connection.query(`CALL deleteUser(?)`, [id], (err, result) => {
    if (err) {
      return next(err);
    }
    // Check if the user exist
    if (result.affectedRows === 0) {
      const error = new Error(`User with ID ${id} doesn't exist`);
      error.status = 404;
      return next(error);
    }

    // If the user is deleted successfully
    res.status(200).json({ success: "User deleted successfully" });
  });
};
