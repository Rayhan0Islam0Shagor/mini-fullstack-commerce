const validateRequest = (schema) => {
  return async (req, res, next) => {
    try {
      // validation check
      //if everything allright next() ->

      await schema.parseAsync(req.body);

      next();
    } catch (err) {
      // Format Zod errors to be readable JSON response
      if (err.name === 'ZodError' && err.issues) {
        const formattedErrors = err.issues.map((error) => ({
          field: error.path.join('.'),
          message: error.message,
          code: error.code,
        }));

        return res.status(400).json({
          success: false,
          message: 'Validation Error',
          errors: formattedErrors,
        });
      }

      // Pass other errors to next error handler
      next(err);
    }
  };
};

export default validateRequest;
