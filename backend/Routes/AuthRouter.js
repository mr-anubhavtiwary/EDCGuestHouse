
const { signup, login } = require("../Controllers/AuthController");
const { application } = require("../Controllers/UserController");
const { signupValidation, loginValidation } = require("../Middlewares/AuthValidation");
const { applicationValidation } = require("../Middlewares/FormValidation");

const router = require("express").Router();

router.post("/login", loginValidation, login);

router.post("/signup", signupValidation, signup);

router.post("/application", applicationValidation, application);

module.exports = router;