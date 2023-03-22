const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();

const { Categories } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

router.route("/").get(validateToken, async(req, res) => {
    showCategories = await Categories.findAll();
    res.json({status:"SUCCESS" ,message: "Fetched all categories successfully",data:showCategories });
});

router.route("/").post(validateToken, async(req, res) => {
    // using sequelize to post data
    // accessing data
    // body has data in json
    const categories = req.body;
    Categories.create(categories);
    res.json({status:"SUCCESS" ,message: "Categories added successfully",data:categories });
});




router.route("/update").get(validateToken, (req, res) => {
    // async and await waiting for the data to be inserting and doing other things
    
        // using sequelize to post data
        // accessing data
        // body has data in json
        const id = req.query['id'];
        console.log(id);
        const cat = req.body;
        const userId = req.user.id;
        const updated = Categories.update(cat, { where: { id: id } });
        res.json({status:"SUCCESS" ,message: "Categories updated successfully",data:cat });
    });


router.route("/delete").get(validateToken, (req, res) => {
            const id = req.query['id'];
            console.log(id);
        
            const updated = Categories.destroy({ where: { id: id } });
            res.json({status:"SUCCESS" ,message: "Categories deleted successfully" });
        });

module.exports = router;