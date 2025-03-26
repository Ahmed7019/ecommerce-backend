import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
// authToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (token == null) return res.status(401).json({ msg: " Access Denied " });

// };

class AuthService {
  static hashPassword(password) {
    return bcrypt.hash(password, 13);
  }

  static comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }

  static generateToken(payload) {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: "30m",
    });
  }

  static verifyToken(token) {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  }
}

export default AuthService;
