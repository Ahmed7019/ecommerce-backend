import jwt from "jsonwebtoken";
export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader.split(" ")[1];

  if (!authHeader) return res.status(403); // Forbidden

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = decoded;
    next();
  });
};
