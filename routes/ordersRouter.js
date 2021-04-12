const express = require("express");
const router = express.Router();

const {
    getOrder,
    addOrder,
    updateOrder,
    deleteOrder
} = require("../controllers/ordersControllers");

// orders
router.route("/").get(getOrders).post(addOrder);

// orders/:id
router.route("/:id").get(getOrder).patch(updateOrder);

module.exports = router;