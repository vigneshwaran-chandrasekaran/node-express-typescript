import { Request, Response, NextFunction } from "express";
import HttpStatus from "http-status-codes";
import { BookModel, Book } from "../models/book.model";

const LIMIT: number = 10;

interface Query {
  page?: number;
  all?: boolean | string;
  pageSize?: number;
}

async function checkIfBookExistsById(_id: string) {
  try {
    return await BookModel.findById({ _id });
  } catch (error) {
    console.log("error", error);
    return error;
  }
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
  } catch (error) {
    return next(error);
  }
};

export const getBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const book = await BookModel.findById(id);

    if (book) {
      return res.status(HttpStatus.OK).json({ data: book });
    }
    return res.status(HttpStatus.NOT_FOUND).json({ errors: "Book Not found!" });
  } catch (error) {
    return next(error);
  }
};

export const createBook = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.validInputs;
    const book: Book = await BookModel.create(data);
    res.status(HttpStatus.CREATED).json({ data: book });
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const ifExists: any = await checkIfBookExistsById(id);

    if (!ifExists?._id) {
      return res.status(HttpStatus.NOT_FOUND).json({
        errors: "Book Not Found!",
      });
    }

    const updatedBook = await BookModel.findByIdAndUpdate(id, req.validInputs, {
      new: true,
      runValidators: true,
    });

    return res.status(HttpStatus.OK).json({ data: updatedBook });
  } catch (error) {
    return next(error);
  }
};

export const deleteBook = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    let book = await BookModel.findById(id);

    if (!book?._id) {
      return res.status(HttpStatus.NOT_FOUND).json({
        errors: "Book Not Found!",
      });
    }

    book = await BookModel.findOneAndDelete(
      { _id: id },
      { new: true, runValidators: true }
    );
    return res.status(HttpStatus.OK).json({ data: book });
  } catch (error) {
    return next(error);
  }
};
