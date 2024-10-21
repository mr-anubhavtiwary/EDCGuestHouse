const { signup, login, adminLogin } = require("../Controllers/AuthController");
const { application, getUserApplications } = require("../Controllers/UserController");
const {
	signupValidation,
	loginValidation,
} = require("../Middlewares/AuthValidation");
const { applicationValidation } = require("../Middlewares/FormValidation");

const { getAdminApplications, patchApplicationStatus } = require("../Controllers/AdminController");
const { IsAdmin } = require("../Middlewares/IsAdmin");
const { IsUser } = require("../Middlewares/IsUser");

const router = require("express").Router();

router.post("/login", loginValidation, login);

router.post("/adminLogin", loginValidation, adminLogin);

router.get("/admin/applications", IsAdmin, getAdminApplications);

router.get("/user/applications", IsUser, getUserApplications);

router.patch("/admin/applications/:appId/status", IsAdmin, patchApplicationStatus);

router.post("/signup", signupValidation, signup);

router.post("/application", applicationValidation, application);

module.exports = router;
