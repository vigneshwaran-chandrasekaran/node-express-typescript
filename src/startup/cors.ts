import cors from "cors";
import { env } from "../utils";

const corsAllowed: string = env.CORS_ALLOWED as string;

const corsEnablesWebsites = corsAllowed.split(",");

const corsOption = {
  credentials: true,
  origin: corsEnablesWebsites,
};

function corsMiddleware(app: any) {
  app.use(cors(corsOption));
}

export default corsMiddleware;
