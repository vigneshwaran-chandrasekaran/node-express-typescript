declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      IMAGES_FOLDER: string;
      CORS_ALLOWED: string;
      MONGO_DB_CONNECTION_LINK: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}

export {};