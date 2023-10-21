import { Request, Response, NextFunction } from "express";
import { BookModel, Book } from "../models/book";

export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const fruits: Book[] = await BookModel.find();
    return res.status(200).json(fruits);
  } catch (error) {
    return next(error);
  }
};
