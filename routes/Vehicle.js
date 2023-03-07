const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();

const { Vehicle } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

router.route("/").get(validateToken, async(req, res) => {
    showVehicle = await Vehicle.findAll();
    res.json(showVehicle);
});


router.route("/").post(async(req, res) => {
    // using sequelize to post data
    // accessing data
    // body has data in json
    const vehicle = req.body;
    console.log(vehicle);
    await Vehicle.create(vehicle);
    res.json(vehicle);
});


module.exports = router;