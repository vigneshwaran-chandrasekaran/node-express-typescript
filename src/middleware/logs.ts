import { Request, Response, NextFunction } from "express";

function logs(req: Request, res: Response, next: NextFunction) {
  console.log("request => ", req.method, " : ", req.path);
  next();
}

export default logs;
