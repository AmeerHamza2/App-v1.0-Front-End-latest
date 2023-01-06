const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const ServiceController = require("../controllers/serviceController");

router.post("/rateProduct", ServiceController.rateProduct);
router.post(
  "/addService",
  [checkAuth.verifyToken, checkAuth.isAdmin],
  ServiceController.addService
);

router.get("/findAll/:serviceProviderId", ServiceController.findAll);
router.get("/findAllServicesForCustomer/", ServiceController.findAllServicesForCustomer);

router.get("/findById/:serviceId", ServiceController.findByServiceId);
router.patch(
  "/updateService/:serviceId",
  [checkAuth.verifyToken, checkAuth.isAdmin],
  ServiceController.updateService
);

router.delete(
  "/deleteService/:serviceId",
  [checkAuth.verifyToken, checkAuth.isAdmin],
  ServiceController.deleteService
);
module.exports = router;
