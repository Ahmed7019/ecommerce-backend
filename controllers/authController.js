import AuthService from "../service/authService.js";
import multer from "multer";
import connection from "../Database/connection.js";
const upload = multer();

let refreshTokens = [];

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
        res.status(200).json({ msg: "User created successfully !" });
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
        res.status(200).json(data);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const refreshToken = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];
  console.log(accessToken);
  const uid = req.body.uid;
  if (accessToken == null)
    return res.status(400).json({ msg: "Access Denied !" });
  const verified = await AuthService.verifyAccessToken(uid, accessToken);
  if (!verified) return res.status(401).json({ msg: "Unauthorized" });

  res.status(200).json({ token: accessToken });
};
