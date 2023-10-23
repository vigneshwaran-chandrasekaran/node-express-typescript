import { cleanEnv, str, email } from "envalid";

const env = cleanEnv(process.env, {
  IMAGES_FOLDER: str({ default: "public-images" }),
  PORT: str({ default: "8081" }),
  MONGO_DB_CONNECTION_LINK: str({
    default: "mongodb://localhost:27017/example",
  }),
  CORS_ALLOWED: str({ default: "http://localhost:8080,http://localhost:8081" }),
  ADMIN_EMAIL: email({ default: "admin@example.com" }),
  NODE_ENV: str({
    choices: ["development", "test", "production", "staging"],
    default: "development",
  }),
});

export default env;
