import { Request, Response, NextFunction } from "express";
import { getCommentsData } from "../services/comment.service";

export const getComments = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const comments: any = await getCommentsData();
    return res.json({
      data: comments?.data,
      meta: {
        total: comments?.data?.length,
      },
    });
  } catch (error) {
    return next(error);
  }
};
