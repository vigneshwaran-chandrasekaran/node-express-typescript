import { Request, Response, NextFunction } from "express";
import HttpStatus from "http-status-codes";
import { ContactModel, Contact } from "../models/contact.model";

const LIMIT: number = 10;

interface Query {
  page?: number;
  all?: boolean | string;
  pageSize?: number;
}

export const getContactUsList = async (
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
      const contactUs: Contact[] = await ContactModel.find().sort({ _id: -1 });

      return res.json({
        data: contactUs,
        meta: {
          total: contactUs.length,
        },
      });
    }

    if (Number.isNaN(page) || page < 1) {
      page = 1;
    }

    const startIndex = (Number(page) - 1) * pageSize; // get the starting index of every page
    const total = await ContactModel.countDocuments({});
    const contactUs: Contact[] = await ContactModel.find()
      .sort({ _id: -1 })
      .limit(pageSize)
      .skip(startIndex);

    return res.json({
      data: contactUs,
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

export const createContactUs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const contactUs: Contact = await ContactModel.create(data);
    res.status(HttpStatus.CREATED).json({ data: contactUs });
  } catch (error) {
    next(error);
  }
};
