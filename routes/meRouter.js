const express = require("express");
const router = express.Router();

const { getUserOrders } = require("../controllers/ordersControllers");

// /me/:userId/orders
// Example call from frontend: /me/12345/orders
router.route("/:userId/orders").get(getUserOrders);

module.exports = router;
