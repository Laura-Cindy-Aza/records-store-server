const express = require("express");
const router = express.Router();

const {
  getOrder,
  addOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/ordersControllers");
const { validateOrder } = require("../middleware/validation");

// orders
router.route("/").get(getOrder).post(validateOrder, addOrder);

// orders/:id
router.route("/:id").get(getOrder).patch(updateOrder).delete(deleteOrder);

module.exports = router;
