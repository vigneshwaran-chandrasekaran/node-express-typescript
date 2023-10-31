import "express-async-errors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import { routes, cors, connectToDB } from "./startup";
import { unCaughtException, unHandledRejection } from "./utils/constants";
import { logs } from "./middleware";
import { env } from "./utils";

console.log("env", env);
const PORT = env.PORT || 8081;
const app = express();

process.on("uncaughtException", (ex) => {
  console.log(unCaughtException, ex);
});

process.on("unhandledRejection", (ex) => {
  console.log(unHandledRejection, ex);
});

app.use(compression());
app.use(morgan("dev"));
app.use(express.static(env.IMAGES_FOLDER));
app.use(helmet());
app.use(logs);
cors(app);
routes(app);

const main = async (): Promise<void> => {
  try {
    await connectToDB();
    app.listen(PORT, () => {
      console.log(`Running on PORT ${PORT}`);
    });
  } catch (error) {
    console.error("An error occurred:", error);
    process.exit(1);
  }
};

main();
