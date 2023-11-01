import { Request, Response, NextFunction } from "express";
import { getCommentsData } from "../services/comment.service";

interface IComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export const getComments = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const comments: IComment[] = await getCommentsData();
    return res.json({
      data: comments,
      meta: {
        total: comments?.length,
      },
    });
  } catch (error) {
    return next(error);
  }
};
