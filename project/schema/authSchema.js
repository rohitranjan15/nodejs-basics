const { body } = require("express-validator");

exports.signupValidation = [
  body("username").not().isEmpty().withMessage("Username is required"),
  body("password").not().isEmpty().withMessage("Password is required"),
];

exports.loginValidation = [
  body("username").not().isEmpty().withMessage("Username is required"),
  body("password").not().isEmpty().withMessage("Password is required"),
];
