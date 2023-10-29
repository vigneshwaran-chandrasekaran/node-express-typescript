import * as Joi from "joi";
import { ERRORS } from "../utils/constants";

const signupSchema = Joi.object({
  firstName: Joi.string().min(3).max(50).required().trim(),
  lastName: Joi.string().min(3).max(50).required().trim(),
  mobile: Joi.string()
    .length(10)
    .pattern(/^[6-9]\d{9}$/)
    .required()
    .messages({
      "string.pattern.base": "Not a valid Mobile Number",
    }),
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
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
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
  password: Joi.string().required(),
});

export { signupSchema, loginSchema };
