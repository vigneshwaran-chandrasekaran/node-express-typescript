import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import HttpStatus from "http-status-codes";
import { env } from "../utils";

function auth(req: any, res: Response, next: NextFunction) {
  const authHeader = req.header("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (
    !token ||
    !authHeader ||
    token === "undefined" ||
    authHeader === "undefined"
  ) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ errors: "Access denied. No token provided." });
  }

  try {
    const decoded: any = jwt.verify(token, env.JWT_PRIVATE_KEY);
    if (!decoded._id) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ errors: "Access denied." });
    }
    req.user = decoded;
    return next();
  } catch (error) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ errors: "Auth token is invalid or expired." });
  }
}

export default auth;
