const express = require('express');
const { sequelize } = require('../models');
const router = express.Router()
const { ExchangedVehicle } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");


router.route("/").get(validateToken, async(req, res) => {
    exchangedVechicle = await ExchangedVehicle.findAll();
    res.json(exchangedVechicle);
});

// async and await waiting for the data to be inserting and doing other things 
router.route("/").post(validateToken, async(req, res) => {
        // using sequelize to post data
        // accessing data
        // body has data in json
        const exVehicle = req.body;
        ExchangedVehicle.create(exVehicle);
        res.json(exVehicle);

    });

module.exports = router