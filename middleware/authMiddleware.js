import AuthService from "../service/authService.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({ msg: " Authentication Required " });
  }

  try {
    const decoded = AuthService.verifyToken(token);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: " Invalid or expired token" });
  }
};

export default authMiddleware;
