import { Request, Response, NextFunction } from "express";
import { BookModel, Book } from "../models/book.model";

const LIMIT: number = 10;

interface Query {
  page?: number;
  all?: boolean | string;
  pageSize?: number;
}

export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    let { page = 1 }: Query = req.query;
    const { all = false, pageSize = LIMIT }: Query = req.query;

    if (all === "true") {
      /**
       * all = true, show all records
       */
      const books: Book[] = await BookModel.find().sort({ _id: -1 });

      return res.json({
        data: books,
        meta: {
          total: books.length,
        },
      });
    }

    if (Number.isNaN(page) || page < 1) {
      page = 1;
    }

    const startIndex = (Number(page) - 1) * pageSize; // get the starting index of every page
    const total = await BookModel.countDocuments({});
    const books: Book[] = await BookModel.find()
      .sort({ _id: -1 })
      .limit(pageSize)
      .skip(startIndex);

    return res.json({
      data: books,
      meta: {
        currentPage: Number(page),
        numberOfPages: Math.ceil(total / pageSize),
        total,
        pageSize,
      },
    });

    // const fruits: Book[] = await BookModel.find();
    // return res.status(200).json(fruits);
  } catch (error) {
    return next(error);
  }
};
