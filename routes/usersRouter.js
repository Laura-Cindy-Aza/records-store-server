
const express = require("express");
const router = express.Router();
const {
  userValidationRules,
  userValidationErrorHandling,
} = require('../middleware/validation');

const {
  getUsers,
  getUser,
  addUser,
  checkUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersControllers");

//  /users

router.route("/").get(getUsers).post(userValidationRules(), userValidationErrorHandling, addUser);

router.route("/login").post(checkUser);


// users/:id

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
