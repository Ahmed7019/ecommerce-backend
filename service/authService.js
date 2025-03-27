import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import connection from "../Database/connection.js";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

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

  static async loginUser(payload, password) {
    const hashedPassword = await payload.password_hash;
    const isMatch = await this.comparePassword(password, hashedPassword);

    // If password is wrong throw an error
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const user = {
      uid: payload.user_id,
      name: payload.name,
      email: payload.email,
      role: payload.role,
    };

    // If the passwords matches generate access token
    const token = this.generateToken(user);
    return {
      accessToken: token,
    };
  }
}

export default AuthService;
