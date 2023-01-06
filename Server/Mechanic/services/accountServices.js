const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const AccountController = require("../controllers/accountController");

router.put(
  "/update/:mechId",
  [checkAuth.verifyToken],
  AccountController.updateProfile
);

router.delete(
  "/delete/:mechId",
  [checkAuth.verifyToken],
  AccountController.deleteProfile
);

// Service Providers
router.delete(
  "/deleteServiceProvider/:serviceId",
 
  AccountController.deleteServiceProvider
);
router.put(
  "/updateServiceProvider/:serviceId",
 
  AccountController.updateServiceProvider
);


module.exports = router;
