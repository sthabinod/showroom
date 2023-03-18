const express = require('express');
const { sequelize } = require('../models');
const router = express.Router()
const { ExchangedVehicle } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");


router.route("/").get(validateToken, async(req, res) => {
    const userId = req.user.id;
    exchangedVechicle = await ExchangedVehicle.findAll({ where: { UserId: userId } });
    res.json(exchangedVechicle);
});

// async and await waiting for the data to be inserting and doing other things 
router.route("/").post(validateToken, async(req, res) => {
        // using sequelize to post data
        // accessing data
        // body has data in json
        userId = req.user.id;
        console.log(userId);
        const exVehicle = req.body;
        ExchangedVehicle.create({
            "title": exVehicle.title,
            "description": exVehicle.description,
            "UserId": userId,
            "cost_price":exVehicle.cost_price,
            "VehicleId":exVehicle.VehicleId

        });
        res.json({status:"SUCCESS" ,message: "Vehicle exchanged successfully",data:exVehicle });

    });

module.exports = router