import mongoose, { ConnectOptions, Connection } from "mongoose";
import { env } from "../utils";

const DB_URI = env.MONGO_DB_CONNECTION_LINK;

export let db: Connection;

export async function connectToDB() {
  if (db) {
    return db;
  }

  try {
    mongoose.set("strictQuery", false);
    mongoose.set("runValidators", true);
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    db = mongoose.connection;
    console.log("Connected to MongoDB");
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    /**
     * If no DB connection stop the app
     */
    process.exit(0);
  }
}
