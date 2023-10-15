import { cleanEnv, str, email, json } from "envalid";

const env = cleanEnv(process.env, {
  API_KEY: str(),
  IMAGES_FOLDER: str({ default: 'public-images' }),
  PORT: str({ default: '3000' }),
  MONGO_DB_CONNECTION_LINK: str({ default: 'mongodb://localhost:27017/example' }),
  CORS_ALLOWED: str({ default: 'http://localhost:8080,http://localhost:3000' }),
  ADMIN_EMAIL: email({ default: "admin@example.com" }),
  EMAIL_CONFIG_JSON: json({ desc: "Additional email parameters" }),
  NODE_ENV: str({ choices: ["development", "test", "production", "staging"] }),
});

export default env;
