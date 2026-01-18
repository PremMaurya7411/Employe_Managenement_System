import { ZodError } from "zod";

const validate = (schema, source = "body") => {
  return (req, res, next) => {
    try {
      const parsed = schema.parse(req[source]);

      req.validated = req.validated || {};
      req.validated[source] = parsed;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(422).json({
          success: false,
          message: "Validation failed",
          errors: error.issues.map(issue => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        });
      }

      next(error);
    }
  };
};

export default validate;
