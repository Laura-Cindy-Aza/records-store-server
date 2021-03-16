const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersControllers");

//  /users

router.route("/").get(getUsers).post(addUser);

// users/:id

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
