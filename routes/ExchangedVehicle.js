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


router.route("/admin").get(validateToken, async(req, res) => {

    exchangedVechicle = await ExchangedVehicle.findAll();
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

    router.route("/update").get(validateToken, (req, res) => {
        // async and await waiting for the data to be inserting and doing other things
        
            // using sequelize to post data
            // accessing data
            // body has data in json
            const id = req.query['id'];
            console.log(id);
            const vehicle = req.body;
            const updated = ExchangedVehicle.update(vehicle, { where: { id: id } });
            res.json({status:"SUCCESS" ,message: "Exchanged Vehicle updated successfully",data:vehicle });
        });
    
    
    router.route("/delete").get(validateToken, (req, res) => {
                const id = req.query['id'];
                console.log(id);
            
                const updated = ExchangedVehicle.destroy({ where: { id: id } });
                res.json({status:"SUCCESS" ,message: "Exchanged Vehicle deleted successfully" });
            });

module.exports = router