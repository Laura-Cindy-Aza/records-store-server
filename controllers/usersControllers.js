const { body } = require('express-validator/check')
const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const customError = require('../helpers/customError');


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
    user.avatar = `${req.protocol}://${req.get("host")}${user.avatar}`;
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Signing up user => creating a new user from 0
exports.addUser = async (req, res, next) => {
  const userData = req.body;
  try {

  //take info in form given and create new user
  const user = await User.create(userData)

  // creating token
  const token = user.generateAuthToken();

  // generating the salt
  const salt = await bcryptjs.genSalt(10);

  // hashing pass /// first argument is the text pass, the second is the salt
  const hashedPass = await bcryptjs.hash(password, salt);

    res.cookie('token', token,{
      expires: new Date(Date.now() + 600000),
      secure: false, //http
      httpOnly: true
    }).json(user);

    // const newUser = await User.create(userData);
    // const newUser = new User({
    //   password: hashedPass,
    //   firstName,
    //   lastName,
    //   email,
    //   nickName,
    // });
    // user.avatar = `${req.protocoll}://${req.get("host")}${user.avatar}`;
    //const savedUser = await newUser.save();
    //res.send(savedUser);
  } catch (error) {
    next(error);
    res.status(400).send(error);
  }
};

// Log in user =>
exports.loginUser = async (req, res, next) => {
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
    Object.assign(user, req.body)
    const userUpdated = await updatedUser.save();
    res.json(userUpdated);
  } catch (err) {
    next(err);
  }
};

// DELETE /users/:id => remove user by ID
exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    let deletedUser = await User.findByIdAndDelete(id);
    if(!deletedUser) throw new Error();
    res.json(deletedUser);
  } catch (err) {
    next(errorHandler(` user with ${id} doesn't exist`));
  }
};

//if user is wants to log out =>
exports.logoutUser = async (req, res, next) => {
  res.clearCookie('token')
  res.json({ message: "Logged out " })
};

//if user wants to log in with email and password =>
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // JS find this user using email given pls 🍭
    const userFound = await User.findOne({ email });

    //what if email does not exist? then we send msg
    if (!userFound) {
      return next(
        customError(
          `No user with ${email}. Please try again`,
          401
        )
      );
    }

    // compare the password given in plain text from frontend
    // with the hashed password stored in database
    const pwCompareResult = bcryptjs.compareSync(password, userFound.password);

    if (!pwCompareResult) {
      return next(customError('Wrong password', 401));
    }

    // Generate a token
    const token = userFound.generateAuthToken();

    // put the token in the response
    res
      .cookie('token', token, {
        expires: new Date(Date.now() + 604800000),
        secure: false, //http
        httpOnly: true,
      })
      .json(userFound);
  } catch (err) {
    next(error);
  }
};

exports.authUser = (req, res) => {
  //req.user
  res.json(req.user);
};