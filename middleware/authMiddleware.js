import AuthService from "../service/authService.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const id = req.body.uid;
  // Check for authHeaders
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid token" });
  }

  // Check if token exists
  if (!token) {
    return res.status(401).json({ msg: "Authentication required" });
  }

  try {
    const decoded = await AuthService.verifyAccessToken(id, token);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") console.log("err");
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};

export default authMiddleware;
