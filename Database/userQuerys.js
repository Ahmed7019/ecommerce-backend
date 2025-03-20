import connection from "./connection.js";
import bcrypt from "bcrypt";
// Insert user
export const insertUser = (user, res, next) => {
  // Accepts user information [name,email,pwd,phone,role]
  connection.query(
    `INSERT INTO users (name,email,password_hash,phone,role) VALUES("${user.name}","${user.email}","${user.pwd}","${user.phone}","${user.role}")`,
    (err, result) => {
      if (err) {
        err.status = 500;
        return next(err);
      }

      res.status(200).json({ msg: "User Added to DB" });
    }
  );
};

export const getUserQuery = (req, res, next) => {
  const id = parseInt(req.params.id);
  connection.query(
    `SELECT * FROM users WHERE user_id = ${id}`,
    (err, result) => {
      if (err) {
        const error = new Error(`User with ID ${id} was not found`);
        error.status = 404;
        return next(error);
      }
      if (result.affectedRows === 0) {
        const error = new Error(`User with ID ${id} doesn't exist`);
        error.status = 404;
        return next(error);
      }
      res.status(200).json({ result });
    }
  );
};

// @desc update user information
export const updateUserQuery = async (req, res, next) => {
  const { uid, name, password, phone } = req.body;

  if (!uid || !name || !password || !phone) {
    const error = new Error("Missing fields");
    error.status = 400;
    return next(error);
  }
  const hash = await bcrypt.hash(password, 10);

  connection.query(
    `
    CALL updateUser(${uid},"${name}","${hash}",${phone})
    `,
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
