import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import HttpStatus from "http-status-codes";

function checkValidMongoId(req: Request, res: Response, next: NextFunction) {
  const id: string = req.params["id"] as string;
  const isValidId: boolean = mongoose.Types.ObjectId.isValid(id);

  if (id === "undefined" || id === null || !id || !isValidId) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ errors: "Not a valid id!" });
  }

  return next();
}

export default checkValidMongoId;
