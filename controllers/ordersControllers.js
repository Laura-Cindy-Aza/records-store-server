const Order = require('../models/Order');

// GET /orders => get all orders
exports.getOrders = async (req, res, next) => {
    let allOrders = await Order.find();
    res.send(allOrders);
};

// GET /orders/:id => get single order by ID
exports.getOrder= async (req, res, next) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id);
        res.json(order);
    } catch (error) {
        next(error)
    };
};

// POST /orders => create order
exports.addOrder = async (req, res, next) => {
    const orderData = req.body;

    try {
        const newOrder = await Order.create(orderData);
        res.json(newOrder);
    } catch (error) {
        next(error)
    };
};

// PATCH /orders/:id => update order by ID
exports.updateOrder = async (req, res, next) => {
    const { id } = req.params;

    try {
        let updateOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updateOrder);
    } catch (err) {
        next(err)
    };
};

// DELETE /orders/:id => remove order by ID
exports.deleteOrder = async (req, res, next) => {
    const { id } = req.params;

    try {
        let deletedRecord = await Order.findByIdAndDelete(id);
        res.json(deletedRecord);
    } catch (err) {
        next(errorHandler(`A order with that ${id} doesn't exist`));
    };
};