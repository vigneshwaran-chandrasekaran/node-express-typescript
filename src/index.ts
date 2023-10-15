import "express-async-errors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import HttpStatus from "http-status-codes";
import { routes, cors, connectMongoDB } from "./startup/index.js";
import { unCaughtException, unHandledRejection } from "./utils/constants.js";
import { logs } from "./middleware";
import { env } from "./utils";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();

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
});

app.get("/", function (req, res) {
  res.send({ data: '"Hello World"' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
