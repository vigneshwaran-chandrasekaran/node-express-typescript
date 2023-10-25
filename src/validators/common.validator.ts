import Joi from "joi";

const commonQueryJoiSchema = Joi.object({
  all: Joi.boolean(),
  page: Joi.number().integer().min(1),
  pageSize: Joi.number().integer().min(1),
});

export { commonQueryJoiSchema };
