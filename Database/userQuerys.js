import connection from "./connection.js";

// @desc  Delete a user query
export const deleteUserQuery = (req, res, next) => {
  const id = parseInt(req.params.id);
  connection.query(`CALL deleteUser(${id})`, (err, result) => {
    if (err) {
      return next(err);
    }
    // Check if the user exist
    if (result.affectedRows === 0) {
      const error = new Error(`User with ID ${uid} doesn't exist`);
      error.status = 404;
      return next(error);
    }

    // If the user is deleted successfully
    res.status(200).json({ success: "User deleted successfully" });
  });
};
