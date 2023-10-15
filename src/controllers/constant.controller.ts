import { Request, Response, NextFunction } from "express";
import HttpStatus from "http-status-codes";
import {
  numbersAll,
  numbers,
  tamilnaduDistricts,
  booleanTypes,
} from "../utils/model";

export const getConstants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(HttpStatus.OK).json({
      data: {
        districts: tamilnaduDistricts,
        booleanTypes,
        numbersAll,
        numbers,
      },
    });
  } catch (error) {
    return next(error);
  }
};
