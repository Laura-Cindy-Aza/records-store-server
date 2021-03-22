const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUser,
  addUser,
  checkUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersControllers");

//  /users

router.route("/").get(getUsers).post(addUser);
router.route("/login").post(checkUser);

// users/:id

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
