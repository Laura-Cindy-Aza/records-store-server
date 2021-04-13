const customError = require('../helpers/customeError');
const User = require('../models/User');

exports.auth = async (req, res, next) => {
    try {
        // take the cookie/token from the request
        const token = req.cookies.token;
        // validate the cookie and check for the user with that _id
        const user = await User.findByToken(token);

        // if the token is corrupted, then throw an error
        if (!user) next(customeError('User was not found'));

        // if token is valid
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};