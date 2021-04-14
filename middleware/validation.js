const { body, validationResult } = require("express-validator");

//Record Validation
exports.validateRecord = (req, res, next) => {
  console.log("This comes from the custom middleware", req.body);
  const record = req.body;
  if (
    record.cover &&
    record.title &&
    record.artist &&
    record.year &&
    record.price
  )
    next();
  else {
    // We will create an error with a message
    const error = new Error(`Your record is not right`);
    error.status = 400;
    // We will call the error handler
    next(error);
  }
};

//Order Validation
exports.validateOrder = (req, res, next) => {
  console.log("This comes from the custom middleware", req.body);
  const order = req.body;
  if (order.records && order.userId && order.totalPrice) next();
  else {
    // We will create an error with a message
    const error = new Error(`Your order is not right`);
    error.status = 400;
    // We will call the error handler
    next(error);
  }
};

//users validatino && sanitization
exports.userValidationRules = () => {
  return [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Your email address is not valid")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 10 })
      .withMessage("short password :s")
      .custom((value) => {
        // //value is password in the body
        // * Passwords must be
        // * - At least 8 characters long, max length anything
        // * - Include at least 1 lowercase letter
        // * - 1 capital letter
        // * - 1 number
        // * - 1 special character => !@#$%^&*
        const regex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{10,}$/;
        //returns a boolean
        const res = regex.test(value);
        return res;
      })
      .withMessage("Put some more chars in your password"),
    body("firstName").trim(),
    body("lastName").trim(),
    body("nickName").trim(),
  ];
};

// // User Validation Error Handling
// exports.userValidationErrorHandling = (req, res, next) => {
//   const errors = validationResult(req);
//   if (errors.isEmpty()) return next();

//   res.status(422).json({ errors: errors.array() });
// };
// User Validation Error Handling
exports.userValidationErrorHandling = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const arrErrors = errors.array();
  const strValidationSummary = mergeErrors(arrErrors);

  next(customError(strValidationSummary, 422));
};

// frontend needs errors as string
// => so let's merge them togetherrrrr
const mergeErrors = (arrErrors) => {
  return arrErrors.map((error) => `${error.param}: ${error.msg}`).join(". ");
};
