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


router.route("/update").put(validateToken, async(req, res) => {
    // async and await waiting for the data to be inserting and doing other things
    
        // using sequelize to post data
        // accessing data
        // body has data in json
        const id = req.query['id'];
        console.log(id);
        const vehicle_parts = req.body;
        const updated = await VehicleParts.update(vehicle_parts, { where: { id: id } });
        res.json({status:"SUCCESS" ,message: "Vehicle updated successfully",data:updated });
    });


router.route("/delete").delete(validateToken, async(req, res) => {
            const id = req.query['id'];
            console.log(id);    
        
            const updated = await VehicleParts.destroy({ where: { id: id } });
            res.json({status:"SUCCESS" ,message: "Vehicle deleted successfully" });
        });


module.exports = router;