import mongoose, { ConnectOptions } from "mongoose";
import { env } from "../utils";

const connectMongoDB = async () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(env.MONGO_DB_CONNECTION_LINK, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }as ConnectOptions)
    .then(() => console.log("Mongo DB Connected Successfully"))
    .catch((err) => {
      console.log(err);
      console.error("Mongo DB Not Connected");
      /**
       * If no DB connection stop the app
       */
      process.exit(0);
    });
  mongoose.set("runValidators", true);
};

export default connectMongoDB;
