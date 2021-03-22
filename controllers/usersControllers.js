const User = require('../models/User');
const bcrypt = require('bcrypt');

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
    const {firstName, lastName, nickName, email, password, avatar} = req.body;

     // generating the salt 
    const salt = await bcrypt.genSalt(10);

    // hashing pass /// first argument is the text pass, the second is the salt 
    const hashedPass = await bcrypt.hash(password, salt);

    try {
        console.log({ password: hashedPass, firstName, lastName, email, nickName, avatar });
        // const newUser = await User.create(userData);
        const newUser = await User.create({password: hashedPass, firstName, lastName, email, nickName, avatar});
        res.json(newUser);
    } catch (error) {
        next(error)
    };
};

// CHECK USER
exports.checkUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ msg: "Invalid email" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ msg: "Invalid password" });
        }
        res.json({ msg: `Welcome ${user.firstName}!`});
    } catch (error) {
        next(error);
    }
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