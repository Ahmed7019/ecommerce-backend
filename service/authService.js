import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import connection from "../Database/connection.js";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

class AuthService {
  static hashPassword(password) {
    return bcrypt.hash(password, 13);
  }

  static comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }

  static generateAccessToken(payload) {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
  }

  static generateRefreshToken(payload) {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });
  }

  static verifyAccessToken(token) {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  }

  static verifyRefreshToken(token) {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
  }

  static refreshToken(token) {
    jwt.verify(token, REFRESH_TOKEN_SECRET, (err, result) => {
      if (err) throw Error("ERROR WITH TOKEN");
      const user = {
        uid: result.uid,
        name: result.name,
        email: result.email,
        role: result.role,
      };
      return this.generateAccessToken(user);
    });
  }

  static async loginUser(payload, password) {
    const hashedPassword = await payload.password_hash;
    const isMatch = await this.comparePassword(password, hashedPassword);

    // Authentication

    // If password is wrong throw an error
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const uid = payload.user_id;
    const user = {
      uid: payload.user_id,
      name: payload.name,
      email: payload.email,
      role: payload.role,
    };
    connection.query(`CALL getToken(?)`, [uid], (err, result) => {
      // Check if their is an existing refresh token

      if (err) return err;

      if (result.affectedRows === 0) {
        // If the refresh token doesn't exist (The user signed for the first time (if false) => create a new refresh token)
        console.log("HELLO");
        const refreshToken = this.generateRefreshToken(user);
        connection.query(`CALL insertToken(?,?)`, [uid, refreshToken]);
        const accessToken = this.generateAccessToken(user);
        return accessToken;
      }

      const token = result.flat()[0].token;
      // If the refresh token exists check if it's valid , (if true) => generate new access token

      const newToken = jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET,
        (err, result) => {
          if (err) return err;
          const user = {
            uid: result.uid,
            name: result.name,
            email: result.email,
            role: result.role,
          };
          const accessToken = this.generateAccessToken(user);
          return {
            accessToken: accessToken,
          };
        }
      );
      return newToken;
    });
  }
}

export default AuthService;
