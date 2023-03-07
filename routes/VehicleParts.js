const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();
const { VehicleParts } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");


router.route("/").get(validateToken, async(req, res) => {
    vehicleParts = await VehicleParts.findAll();
    res.json(vehicleParts);
});

// async and await waiting for the data to be inserting and doing other things
router.route("/").post(validateToken, async(req, res) => {
    // using sequelize to post data
    // accessing data
    // body has data in json
    const vehicleParts = req.body;
    await VehicleParts.create(vehicleParts);
    res.json(vehicleParts);
});

module.exports = router;