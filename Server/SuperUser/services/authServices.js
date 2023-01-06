const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");
//const mechanicAuthController = require("../controllers/mechanicAuthController");
router.post("/login", AuthController.login);

router.post("/register", AuthController.register);

router.post("/registerMechanic", AuthController.registerMechanic);

module.exports = router;
