import * as Joi from "joi";

const bookJoiSchema = Joi.object({
  name: Joi.string().min(1).max(100).required().trim(),
  author: Joi.string().min(2).max(50).required().trim(),
  price: Joi.number().required(),
  isOutOfStock: Joi.boolean().required(),
});

export { bookJoiSchema };
