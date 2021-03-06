const express = require("express");
const router = express.Router();

const {
  getOrder,
  getOrders,
  addOrder,
  updateOrder,
  deleteOrder,
  getUserOrders,
} = require("../controllers/ordersControllers");
const { validateOrder } = require("../middleware/validation");

// orders
router.route("/").get(getOrders).post(validateOrder, addOrder);

// orders/:id
router
  .route("/:id")
  .get(getOrder)
  .patch(updateOrder)
  .delete(deleteOrder)
  .get(getUserOrders);

module.exports = router;
