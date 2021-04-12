const express = require("express");
const router = express.Router();

const {
  getRecords,
  addRecord,
  getRecord,
  updateRecord,
  deleteRecord,
} = require("../controllers/recordsControllers");

// records
router.route("/").get(getRecords).post(addRecord);

// records/:id
router.route("/:id").get(getRecord).patch(updateRecord).delete(deleteRecord);

module.exports = router;
