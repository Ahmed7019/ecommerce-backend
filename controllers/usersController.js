import { getUserQuery, insertUser } from "../Database/querys.js";
import multer from "multer";

const upload = multer();

// @desc    Get the user using id
// @route   GET /api/user/id
export const getUser = (req, res, next) => getUserQuery(req, res, next);
// @desc    POST a user
// @route   POST /api/ user
export const createNewUser =
  (upload.array(),
  (req, res, next) => {
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.pwd ||
      !req.body.phone ||
      !req.body.role
    ) {
      const err = new Error(`One or more field is missing`);
      err.status = 404;
      return next(err);
    }

    insertUser(req.body, res, next);
  });
