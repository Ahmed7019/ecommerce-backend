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
