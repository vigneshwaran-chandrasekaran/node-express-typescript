import express, { Request, Response, NextFunction } from "express";
import constants from "../routes/constants";

interface Error {
  status?: number;
  message?: string;
}

function application(app: any) {
  app.use(express.json());
  app.get("/", (req: Request, res: Response) => {
    res.json({ data: "welcome to Node js Typescript" });
  });
  app.get("/api/v1", (req: Request, res: Response) => {
    res.json({ data: "welcome to Node js Typescript" });
  });
  app.use("/api/v1/constants", constants);

  app.use("*", (req: Request, res: Response, next: NextFunction) => {
    const err: Error = new Error();
    err.status = 404;
    err.message = "404, route not found";
    next(err);
  });
}

export default application;
