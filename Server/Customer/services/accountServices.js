const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const AccountController = require("../controllers/accountController");

router.get(
  "/findAll",
 // checkAuth.verifyToken,//
  AccountController.findAll
);

router.get("/findCustById/:custId", AccountController.findCustById);

router.put(
  "/updateCustomer/:custId",
 
  AccountController.updateCustomer
);

router.delete(
  "/deleteCustomer/:custId",
 
  AccountController.deleteCustomer
);

module.exports = router;
