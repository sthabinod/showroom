const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();
const formidable = require("formidable");
const { Vehicle } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

router.route("/").get(validateToken, async(req, res) => {
    showVehicle = await Vehicle.findAll();
    res.json(showVehicle);
});

router.route("/user").get(validateToken, async(req, res) => {

    showVehicle = await Vehicle.findAll({ where: { id: id } });
    res.json(showVehicle);
});




router.route("/").post(validateToken, async(req, res) => {
    const form = formidable.IncomingForm();
    console.log(form);
    // using sequelize to post data
    // accessing data
    // body has data in json
    const vehicle = req.body;
    console.log(vehicle);
    await Vehicle.create(vehicle);
    res.json({status:"SUCCESS" ,message: "Vehicle added successfully",data:vehicle });
});



router.route("/update").put(validateToken, async(req, res) => {
    // async and await waiting for the data to be inserting and doing other things
    
        // using sequelize to post data
        // accessing data
        // body has data in json
        const id = req.query['id'];
        console.log(id);
        const vehicle = req.body;
        const userId = req.user.id;
        const updated = await Vehicle.update(vehicle, { where: { id: id } });
        res.json({status:"SUCCESS" ,message: "Vehicle updated successfully",data:vehicle });
    });


router.route("/delete").delete(validateToken, async(req, res) => {
            const id = req.query['id'];
            console.log(id);
        
            const userId = req.user.id;
            const updated = await Vehicle.destroy({ where: { id: id } });
            res.json({status:"SUCCESS" ,message: "Vehicle deleted successfully" });
        });

module.exports = router;