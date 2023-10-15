import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import morgan from "morgan";
import HttpStatus from "http-status-codes";
import { routes, cors, connectMongoDB } from "./startup";
import { unCaughtException, unHandledRejection } from "./utils/constants";
import { logs } from "./middleware";
import { env } from "./utils";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();

interface Error {
  status?: number;
  keyValue?: any;
  message?: string;
  errors?: any;
  name?: string;
  code?: number;
  stack?: any;
}

process.on("uncaughtException", (ex) => {
  console.log(unCaughtException, ex);
});

process.on("unhandledRejection", (ex) => {
  console.log(unHandledRejection, ex);
});

app.use(morgan("dev"));
app.use(express.static(env.IMAGES_FOLDER));
app.use(helmet());
connectMongoDB();
app.use(logs);
cors(app);
routes(app);

const PORT = env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
  console.log(`Server running on http://localhost:${PORT}/`);
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
