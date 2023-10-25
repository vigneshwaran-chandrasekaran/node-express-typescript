import express from "express";
import rateLimit from "express-rate-limit";
import { validator } from "../middleware";
import { contactJoiSchema } from "../validators/contact.validator";
import {
  getContactUsList,
  createContactUs,
} from "../controllers/contact.controller";

const router = express.Router();
const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // Limit each IP to 5 requests per `window` (here, per 5 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (request, response, next, options) =>
    response.status(options.statusCode).json({ errors: options.message }),
});

router.get("/", getContactUsList);
router.post("/", [apiLimiter, validator(contactJoiSchema)], createContactUs);

export default router;
