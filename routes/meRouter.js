const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/authentication");

const { getUserOrders } = require("../controllers/ordersControllers");
const { authUser } = require("../controllers/usersControllers");

// /me/:userId/orders
// Example call from frontend: /me/12345/orders
router.route("/orders").get(auth, getUserOrders);
router.route("/auth").post(auth, authUser);

module.exports = router;
