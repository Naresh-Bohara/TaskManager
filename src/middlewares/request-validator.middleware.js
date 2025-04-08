import HttpStatus from "../constants/http-status.constants.js";

// Middleware to validate request body against a Joi schema
const bodyValidator = (schemaDto) => {
  return async (req, res, next) => {
    try {
      const validatedData = await schemaDto.validateAsync(req.body, { abortEarly: false });

      // Optionally attach validated data to the request
      req.validatedBody = validatedData;

      next();
    } catch (error) {
      const errors = {};

      if (error?.details) {
        error.details.forEach((detail) => {
          const field = detail.context.label || detail.context.key;
          errors[field] = detail.message;
        });
      }

      next({
        statusCode: HttpStatus.BAD_REQUEST.statusCode,
        status: "VALIDATION_FAILED",
        message: "Validation Failed",
        detail: errors,
      });
    }
  };
};

export { bodyValidator };
