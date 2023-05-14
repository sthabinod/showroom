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
    const categories = req.body;
    Categories.create(categories);
    res.json({status:"SUCCESS" ,message: "Categories added successfully",data:categories });
});




router.route("/update").put(validateToken, async(req, res) => {
        const id = req.query['id'];
        console.log(id);
        const cat = req.body;
        const userId = req.user.id;
        const updated = Categories.update(cat, { where: { id: id } });
        res.json({status:"SUCCESS" ,message: "Categories updated successfully",data:cat });
    });


router.route("/delete").delete(validateToken, async(req, res) => {
            const id = req.query['id'];
            console.log(id);
        
            const updated =await Categories.destroy({ where: { id: id } });
            res.json({status:"SUCCESS" ,message: "Categories deleted successfully" });
        });

module.exports = router;