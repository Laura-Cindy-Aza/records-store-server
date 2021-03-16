const User = require('../models/User');

// GET /users => get all users
exports.getUsers = async (req, res, next) => {
    let allUsers = await User.find();
    res.send(allUsers);
};

// GET /users/:id => get single user by ID
exports.getUser = async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        res.json(user);
    } catch (error) {
        next(error)
    }
};

// POST /users => create user
exports.addUser = async (req, res, next) => {
    const userData = req.body;

    try {
        const newUser = await User.create(userData);
        res.json(newUser);
    } catch (error) {
        next(error)
    };
};

// PATCH /users/:id => update user by ID
exports.updateUser = async (req, res, next) => {
    const { id } = req.params;

    try {
        let updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedUser);
    } catch (err) {
        next(err)
    };
};

// DELETE /users/:id => remove user by ID
exports.deleteUser = async (req, res, next) => {
    const { id } = req.params;

    try {
        let deletedUser = await User.findByIdAndDelete(id);
        res.json(deletedUser);
    } catch (err) {
        next(errorHandler(`A user with that ${id} doesn't exist`));
    };
};