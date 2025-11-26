const validateRequest = (schema) => {
  return async (req, res, next) => {
    try {
      // validation check
      //if everything allright next() ->

      await schema.parseAsync(req.body);

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validateRequest;
