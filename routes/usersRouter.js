const express = require("express");
const router = express.Router();
const {
  userValidationRules,
  userValidationErrorHandling,
} = require("../middleware/validation");
const { auth } = require("../middleware/authentication");

const {
  getUsers,
  getUser,
  addUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersControllers");

//  /users

router
  .route("/")
  .get(getUsers)
  .post(userValidationRules(), userValidationErrorHandling, addUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

// users/:id

router
  .route("/:id")
  .get(auth, getUser)
  .patch(auth, updateUser)
  .delete(auth, deleteUser);

module.exports = router;
