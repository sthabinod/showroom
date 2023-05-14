const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();

const { validateToken } = require("../middleware/AuthMiddleware");
const { Product, Customer, PartsOrder } = require("../models");

router.route("/").get(validateToken,async(req,res)=>{
    const userId = req.user.id;
    getRelatedOrder = await PartsOrder.findAll({ where: { UserId: userId } });
    res.json({status:"SUCCESS" ,message: "Fetched data.",data:getRelatedOrder });
});


router.route("/admin").get(validateToken,async(req,res)=>{
    getRelatedOrder = await PartsOrder.findAll();
    res.json({status:"SUCCESS" ,message: "Fetched all data successfully.",data:getRelatedOrder });
});

// async and await waiting for the data to be inserting and doing other things 
router.route("/").post(validateToken, async(req, res) => {
    // using sequelize to post data
    // accessing data
    // body has data in json
    const order = req.body;
    console.log(order);
    const userId = req.user.id
    console.log(userId);
    const customer = await Customer.findOne({
        where: { UserId: userId },
    });

    

    if (!customer) {
        res.json({
            error: "You have to update information before submitting order.",
        });
    } else if (customer) {
        const orderToAdd = await PartsOrder.create({
            "quantity": order.quantity,
            "orderDate": order.orderDate,
            "UserId": userId,
            "partsOrderId":order.partsOrderId,
            "VehiclePartId":order.VehiclePartId

        });
        res.json({status:"SUCCESS" ,message: "Wait for confirmation.",data:orderToAdd });
    }
});



// async and await waiting for the data to be inserting and doing other things 
router.route("/admin").post(validateToken, async(req, res) => {
    // using sequelize to post data
    // accessing data
    // body has data in json
    const id = req.query['id'];
    const order = req.body;
    console.log(order);
   
    

        const orderToAdd = await PartsOrder.create({
            "quantity": order.quantity,
            "orderDate": order.orderDate,
            "UserId": id,
            "partsOrderId":order.partsOrderId,
            "VehiclePartId":order.VehiclePartId

        });
        res.json({status:"SUCCESS" ,message: "Wait for confirmation.",data:orderToAdd });
});


router.route("/update").put(validateToken, async(req, res) => {
    // async and await waiting for the data to be inserting and doing other things
    
        // using sequelize to post data
        // accessing data
        // body has data in json
        const id = req.query['id'];
        console.log(id);
        const part_order = req.body;
        const updated =await PartsOrder.update(part_order, { where: { id: id } });
        res.json({status:"SUCCESS" ,message: "Parts Order udpated successfully",data:part_order });
    });


router.route("/delete").delete(validateToken, async(req, res) => {
            const id = req.query['id'];
            console.log(id);    
        
            const updated = await PartsOrder.destroy({ where: { id: id } });
            res.json({status:"SUCCESS" ,message: "Vehicle Order deleted successfully" });
        });
module.exports = router;