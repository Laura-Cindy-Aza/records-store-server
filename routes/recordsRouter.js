const express = require("express");
const router = express.Router();


const {
  getRecords,
  addRecord,
  getRecord,
  updateRecord,
  deleteRecord,
} = require("../controllers/recordsControllers");
const { validateRecord } = require('../middleware/validation');

// records
router.route("/").get(getRecords).post(validateRecord, addRecord);

// records/:id
router.route("/:id").get(getRecord).patch(updateRecord).delete(deleteRecord);

module.exports = router;
