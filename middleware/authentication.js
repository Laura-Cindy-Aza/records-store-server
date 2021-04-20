const customError = require("../helpers/customError");
const User = require("../models/User");

exports.auth = async (req, res, next) => {
  try {
    console.log(`req.cookies`, req.cookies);
    // take the cookie/token from the request
    const token = req.cookies.token;
    // validate the cookie and check for the user with that _id
    const user = await User.findByToken(token);

    // if the token is corrupted, then throw an error
    if (!user) next(customError("User was not found"));

    // if token is valid
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
