 import * as Joi from "joi";
import { ERRORS } from "../utils/constants";

const contactJoiSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().trim(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .trim()
    .lowercase()
    .required()
    .messages({
      "string.email": ERRORS.users.validEmail,
      "string.trim": ERRORS.users.trim,
      "string.empty": ERRORS.users.empty,
    }),
  mobile: Joi.string()
    .length(10)
    .pattern(/^[6-9]\d{9}$/)
    .required()
    .messages({
      "string.pattern.base": "Not a valid Mobile Number",
    }),
  message: Joi.string().min(3).max(1023).required().trim(),
});

export { contactJoiSchema };
