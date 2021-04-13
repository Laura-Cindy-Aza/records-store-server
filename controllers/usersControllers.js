const { body } = require('express-validator/check')
const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const customError = require("../helpers/customError");

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
    user.avatar = `${req.protocoll}://${req.get("host")}${user.avatar}`;
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// POST /users => create user
exports.addUser = async (req, res, next) => {
  const { firstName, lastName, nickName, email, password } = req.body;

  // generating the salt
  const salt = await bcryptjs.genSalt(10);

  // hashing pass /// first argument is the text pass, the second is the salt
  const hashedPass = await bcryptjs.hash(password, salt);

  try {
    // const newUser = await User.create(userData);
    const newUser = new User({
      password: hashedPass,
      firstName,
      lastName,
      email,
      nickName,
    });
    // user.avatar = `${req.protocoll}://${req.get("host")}${user.avatar}`;
    const savedUser = await newUser.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

// CHECK USER
exports.checkUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ msg: "Invalid email" });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    // const isMatch = password === user.password;
    if (!isMatch) {
      return res.json({ msg: "Invalid password" });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// PATCH /users/:id => update user by ID
exports.updateUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    let updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    user.avatar = `${req.protocoll}://${req.get("host")}${user.avatar}`;
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// DELETE /users/:id => remove user by ID
exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    let deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (err) {
    next(errorHandler(`A user with that ${id} doesn't exist`));
  }
};
