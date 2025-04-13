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
      expiresIn: "7d",
    });
  }

  static async verifyAccessToken(id, token) {
    // If the token is expired check for the user refresh token

    try {
      if (!token) throw new Error("Token not provided");
      const verifiedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
      const user = {
        uid: verifiedToken.uid,
        name: verifiedToken.name,
        email: verifiedToken.email,
        role: verifiedToken.role,
      };
      return user;
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        try {
          // 3. Get refresh token from DB (promisified)
          const [results] = await connection
            .promise()
            .query(`CALL getToken(?)`, [id]);
          const dbToken = results.flat()[0]?.token;

          if (!dbToken) throw new Error("No refresh token found");

          // 4. Verify refresh token
          const refreshTokenData = this.verifyRefreshToken(dbToken);

          if (!refreshTokenData) throw new Error("Invalid refresh token");
          // 5. Generate new access token
          const user = {
            uid: id,
            name: refreshTokenData.name,
            email: refreshTokenData.email,
            role: refreshTokenData.role,
          };

          const newAccessToken = this.generateAccessToken(user);
          return {
            user,
            newAccessToken,
            isRefreshed: true,
          };
        } catch (refreshError) {
          throw new Error(`Token refresh failed: ${refreshError.message}`);
        }
      }
    }
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

    // Authorization & jwt
    return new Promise((resolve, reject) => {
      const user = {
        uid: payload.user_id,
        name: payload.name,
        email: payload.email,
        role: payload.role,
      };

      // Check if their is an existing refresh token
      connection.query(`CALL getToken(?)`, [uid], (err, result) => {
        if (err) return reject(err);
        if (!result.flat()[0].token) {
          // check if the refresh token exists
          // If the refresh token doesn't exist (The user signed for the first time (if false) => create a new refresh token)
          const refreshToken = this.generateRefreshToken(user);
          connection.query(`CALL insertToken(?,?)`, [uid, refreshToken]);
          const accessToken = this.generateAccessToken(user);
          return resolve({
            accessToken: accessToken,
            refreshToken: refreshToken,
          });
        }

        const token = result.flat()[0].token;
        // If the refresh token exists check if it's valid , (if true) => generate new access token

        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, result) => {
          // If the refresh token is expired delete it from db and create new refresh token
          if (err) {
            connection.query(`CALL deleteToken(?)`, [uid]);
            const refreshToken = this.generateRefreshToken(user);
            connection.query(`CALL insertToken(?,?)`, [uid, refreshToken]);
            const accessToken = this.generateAccessToken(user);
            return resolve({
              accessToken: accessToken,
              refreshToken: refreshToken,
            });
          }
          const accessToken = this.generateAccessToken(user);
          return resolve({
            accessToken: accessToken,
            refreshToken: token,
          });
        });
      });
    });
  }
}

export default AuthService;
