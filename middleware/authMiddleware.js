import AuthService from "../service/authService.js";
import jwt from "jsonwebtoken";
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  // Check for authHeaders
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];
  // Check if token exists
  if (!token || token == null) {
    return res.status(403).json({ msg: "Authentication required" });
  }

  try {
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
      req.user = decoded;
      next();
    });
  } catch (err) {
    if (err.name === "TokenExpiredError") console.log("err");
    else console.log(err.name);
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};

export default authMiddleware;
