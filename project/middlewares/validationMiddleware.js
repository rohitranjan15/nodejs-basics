const { validationResult } = require("express-validator");

function validationMiddleware(schema) {
  return async (req, res, next) => {
    await Promise.all(schema.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  };
}

module.exports = { validationMiddleware };
