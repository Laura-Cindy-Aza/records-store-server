const Record = require('../models/Record');

// GET /records => get all records
exports.getRecords = async (req, res, next) => {
    let allRecords = await Record.find();
    res.send(allRecords);
};

// GET /records/:id => get single record by ID
exports.getRecord = async (req, res, next) => {
    const { id } = req.params;

    try {
        const record = await Record.findById(id);
        res.json(record);
    } catch (error) {
        next(error)
    };
};

// POST /records => create record
exports.addRecord = async (req, res, next) => {
    const recordData = req.body;

    try {
        const newRecord = await Record.create(recordData);
        res.json(newRecord);
    } catch (error) {
        next(error)
    };
};

// PATCH /records/:id => update record by ID
exports.updateRecord = async (req, res, next) => {
    const { id } = req.params;

    try {
        let updatedRecord = await Record.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedRecord);
    } catch (err) {
        next(err)
    };
};

// DELETE /records/:id => remove record by ID
const Record = require('../models/Record');

// GET /records => get all records
exports.getRecords = async (req, res, next) => {
    let allRecords = await Record.find();
    res.send(allRecords);
};

// GET /records/:id => get single record by ID
exports.getRecord = async (req, res, next) => {
    const { id } = req.params;

    try {
        const record = await Record.findById(id);
        res.json(record);
    } catch (error) {
        next(error)
    };
};

// POST /records => create record
exports.addRecord = async (req, res, next) => {
    const recordData = req.body;

    try {
        const newRecord = await Record.create(recordData);
        res.json(newRecord);
    } catch (error) {
        next(error)
    };
};

// PATCH /records/:id => update record by ID
exports.updateRecord = async (req, res, next) => {
    const { id } = req.params;

    try {
        let updatedRecord = await Record.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedRecord);
    } catch (err) {
        next(err)
    };
};

// DELETE /records/:id => remove record by ID
exports.deleteRecord = async (req, res, next) => {
    const { id } = req.params;

    try {
        let deletedRecord = await Record.findByIdAndDelete(id);
        res.json(deletedRecord);
    } catch (err) {
        next(errorHandler(`A record with that ${id} doesn't exist`));
    };
};