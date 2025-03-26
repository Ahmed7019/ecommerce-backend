import AuthService from "../service/authService.js";
import multer from "multer";
import connection from "../Database/connection.js";
const upload = multer();

export const authenticateUser = (req, res) => {
  const { email, name, role } = req.body;
  const user = { email: email, username: name, role: role };
  const accessToken = AuthService.generateToken(user);
  res.json({ accessToken: accessToken });
};

export const register =
  (upload.array(),
  async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      const err = new Error(`One or more field is missing`);
      err.status = 400;
      return next(err);
    }
    const hashedPassword = await AuthService.hashPassword(password);

    connection.query(
      `CALL createUser(?,?,?)`,
      [name, email, hashedPassword],
      (err, result) => {
        if (err) return next(err);
        res.status(201).json({ msg: "User created successfully !" });
      }
    );
  });
