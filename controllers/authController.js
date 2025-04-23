import AuthService from "../service/authService.js";
import multer from "multer";
import connection from "../Database/connection.js";
const upload = multer();

export const authenticateUser = (req, res) => {
  const { email, name, role } = req.body;
  const user = { email: email, username: name, role: role };
  const accessToken = AuthService.generateAccessToken(user);
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

        connection.query(`CALL getUserByEmail(?)`, [email], (err, result) => {
          if (err) return next(err);

          res.status(200).json({
            msg: "User created successfully !",
            id: result.flat()[0].user_id,
          });
        });
      }
    );
  });

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    connection.query(`CALL authUser(?)`, [email], (err, result) => {
      if (err) return err;

      if (result[0].length === 0) {
        const error = new Error("Invalid email or password");
        error.status = 401;
        return next(error);
      }
      const payload = result.flat()[0];
      const user = AuthService.loginUser(payload, password);
      if (!user) console.log("error with user");
      user.then((data) => {
        res.cookie("jwt", data.refreshToken, {
          httpOnly: true,
          maxAge: 24 * 7 * 60 * 60 * 1000,
        });
        res.json({ accessToken: data.accessToken });
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  res.clearCookie("jwt");
  res.sendStatus(204);
};

export const updateUserRole = (req, res, next) => {
  const { uid, role } = req.body;

  if (!uid || !role) {
    const err = new Error("Bad request");
    err.status = 400;
    return next(err);
  }
  console.log(uid);
  connection.query(`CALL updateUserRole(?,?)`, [uid, role], (err, result) => {
    if (err) return next(err);
    console.log(result);
    return res.status(200).json({ msg: "Update successfully !" });
  });
};
