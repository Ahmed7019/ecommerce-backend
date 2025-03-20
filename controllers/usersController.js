import connection from "../Database/connection.js";
import {
  deleteUserQuery,
  getUserQuery,
  insertUser,
  updateUserQuery,
} from "../Database/userQuerys.js";
import multer from "multer";

import bcrypt from "bcrypt";

const upload = multer();

// @desc    Get the user using id
// @route   GET /api/user/id
export const getUser = (req, res, next) => getUserQuery(req, res, next);

// @desc    Create a new user
// @route   POST /api/ user
export const createNewUser =
  (upload.array(),
  async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      const err = new Error(`One or more field is missing`);
      err.status = 400;
      return next(err);
    }
    const hashedPassword = await bcrypt.hash(password, 13);
    connection.query(
      `CALL createUser("${name}",
      "${email}",
      "${hashedPassword}"
      )`,
      (err, result) => {
        if (err) return next(err);

        res.status(201).json({ msg: "User added successfully !" });
      }
    );
  });

//  @desc     Update an existing user
//  @route    PUT  / api/user/:id

export const updateUser = (...args) => updateUserQuery(...args);

export const updateUserRole = (req, res, next) => {
  const { uid, role } = req.body;

  if (!uid || !role) {
    const err = new Error("Bad request");
    err.status = 400;
    return next(err);
  }

  connection.query(`CALL updateUserRole(${uid},"${role}")`, (err, result) => {
    if (err) return next(err);
    res.status(200).json({ msg: "Update successfully !" });
  });
};
// @desc    Delete user
// @route   DELETE /api/user/:id
export const deleteUser = (...args) => deleteUserQuery(...args);
