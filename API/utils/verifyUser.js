import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  if (!req.cookies || !req.cookies.accessToken)
    return next(createError(401, "You aren't authenticated (no token)"));

  const token = req.cookies.accessToken;
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "token isn't valid"));

    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "you'ren't authorized"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "you'ren't authorized"));
    }
  });
};
