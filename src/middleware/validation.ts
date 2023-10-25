import HttpStatus from "http-status-codes";
import { Request, Response, NextFunction } from "express";

/**
 * As an application developer, you should never trust the data provided by users.
 * At any possible input! That doesn’t only apply for request payload send within the request body,
 * but also for query parameters.
 */

// https://softchris.github.io/pages/joi.html#introducing-joi

export interface RequestCustom extends Request {
  validInputs: any;
}

type PropertyType = "body" | "query";

function validator(schema: any, property: PropertyType = "body") {
  return function validate(
    req: any,
    res: Response,
    next: NextFunction
  ) {
    try {
      /**
       * Added common validation config below
       */
      schema = schema.options({ abortEarly: false, stripUnknown: true });
      const { error, value } = schema.validate(req[property]);
      if (error) {
        const errors: any = {};
        /**
         * Form validation
         */
        error.details.forEach((item: any) => {
          errors[item.context.key] = item.message;
        });
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ errors });
      }
      req.validInputs = value;
      return next();
    } catch (error: any) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        errors: error.message,
      });
    }
  };
}

export default validator;
