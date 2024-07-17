const express = require("express");
const { signup, login } = require("../controllers/authController");
const { validationMiddleware } = require("../middlewares/validationMiddleware");
const { signupValidation, loginValidation } = require("../schema/authSchema");

const router = express.Router();

router.post("/signup", validationMiddleware(signupValidation), signup);
router.post("/login", validationMiddleware(loginValidation), login);

module.exports = router;
