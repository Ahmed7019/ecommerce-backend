import connection from "./connection.js";

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

      if (!result || !result.length) {
        const error = new Error(`No user with ID ${id}`);
        error.status = 404;
        return next(error);
      }
      res.status(200).json(result);
    }
  );
};
