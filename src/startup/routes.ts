import express, { Request, Response, NextFunction } from "express";
import HttpStatus from "http-status-codes";
import constants from "../routes/constants.route";
import fruits from "../routes/fruit.route";
import books from "../routes/book.route";
import contacts from "../routes/contact.route";
import { env } from "../utils";

interface Error {
  status?: number;
  keyValue?: any;
  message?: string;
  errors?: any;
  name?: string;
  code?: number;
  stack?: any;
}

function application(app: any) {
  app.use(express.json());
  app.get("/favicon.ico", (req: Request, res: Response) => res.status(204));
  app.get("/", (req: Request, res: Response) => {
    res.json({ data: "welcome to Node js Typescript" });
  });
  app.get("/api/v1", (req: Request, res: Response) => {
    res.json({ data: "welcome to Node js Typescript" });
  });
  app.use("/api/v1/constants", constants);
  app.use("/api/v1/fruits", fruits);
  app.use("/api/v1/books", books);
  app.use("/api/v1/contact-us", contacts);

  app.use("*", (req: Request, res: Response, next: NextFunction) => {
    const err: Error = new Error();
    err.status = 404;
    err.message = "404, route not found";
    next(err);
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    /**
     * next is important to handle express errors, don't remove it
     */
    console.log("!!!!!!!err!!!!!!!", err);
    console.log("err.name", err.name);
    console.log("err.code", err.code);
    console.log("err.message", err.message);
    if (err.name === "MongoServerError" && err.code === 11000) {
      const errors: any = {};
      Object.keys(err.keyValue).forEach((key) => {
        errors[key] = `${err.keyValue[key]} already Exists`;
      });
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        errors,
      });
    }
    if (err.name === "ValidationError") {
      console.log('-------ValidationError-------');
      const errors: any = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        errors,
      });
    }
    return res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
      errors: "Internal server error",
      stack: env.NODE_ENV === "production" ? null : err.stack,
    });
  });
}

export default application;
