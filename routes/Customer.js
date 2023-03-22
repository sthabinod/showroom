const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();
const { User,Customer } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");

router.route("/").get(validateToken, async(req, res) => {
    showCustomer = await Customer.findAll();
    res.json(showCustomer);
});

router.route("/get-customer-by-user-id").get(validateToken,async(req,res)=>{
    const userId = req.user.id
    const userObject = await User.findOne({ where: { id: userId } });
    customerObject = await Customer.findOne({ where: { UserId:userObject.id } });
    res.json(customerObject);
});


// async and await waiting for the data to be inserting and doing other things
router.route("/").post(validateToken, async(req, res) => {
    // using sequelize to post data
    // accessing data
    // body has data in json
    const customer = req.body;
    console.log(req.body);
    await Customer.create(customer);
    res.json({status:"SUCCESS" ,message: "Customer added successfully",data:customer });
});

router.route("/update").get(validateToken, (req, res) => {
    // async and await waiting for the data to be inserting and doing other things
    
        // using sequelize to post data
        // accessing data
        // body has data in json
        const id = req.query['id'];
        console.log(id);
        const customer = req.body;
        const updated = Customer.update(customer, { where: { id: id } });
        res.json({status:"SUCCESS" ,message: "Customer updated successfully",data:customer });
    });


router.route("/delete").get(validateToken, (req, res) => {
            const id = req.query['id'];
            console.log(id);
            const updated = Customer.destroy({ where: { id: id } });
            res.json({status:"SUCCESS" ,message: "Customer deleted successfully" });
        });


module.exports = router;