import jwt from "jsonwebtoken";
import AuthService from "../service/authService.js";
export default function handleRefreshToken(req, res) {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);
  console.log(cookies.jwt);

  const refreshToken = cookies.jwt;

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);

    const user = {
      uid: decoded.uid,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
    };

    const accessToken = AuthService.generateAccessToken(user);

    res.json({ accessToken: accessToken });
  });
}
