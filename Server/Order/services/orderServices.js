const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const OrderController = require("../controllers/ordersController");
const StripeController = require("../controllers/stripeController");
router.post("/addOrder", [checkAuth.verifyToken], OrderController.addOrder);

router.get("/findCompltedOrders/:serviceProviderId", OrderController.findCompltedOrders);


router.post("/payment",StripeController.payment)
module.exports = router;
