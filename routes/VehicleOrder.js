const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();
const { VehicleOrder,Customer } = require("../models");
const Sequelize = require("sequelize");
const { validateToken } = require("../middleware/AuthMiddleware");

router.route("/by-user").get(validateToken,async(req,res)=>{
    const userId = req.user.id;
    getRelatedOrder = await VehicleOrder.findAll({ where: { UserId: userId } });
    res.json(getRelatedOrder);
});


router.route("/").get(validateToken,async(req,res)=>{
    const userId = req.user.id

    const orderObject = await VehicleOrder.findAll({where:{
        UserId:userId}})

    if (!orderObject)
    {
        res.json({"error":"Not found"});
    }
    else if (orderObject)
    {
        res.json(orderObject);
    }

}); 


router.route("/").post(validateToken,async(req,res)=>{
    // using sequelize to post data
    // accessing data
    // body has data in json
    const order = req.body;
    console.log(order);
    const userId = req.user.id
    console.log(userId);
    // const customerObject = await Customer.findOne({ where: { UserId: userId } });
    const orderToAdd = await VehicleOrder.create({
        orderId: order.orderId,
        isBooked:order.isBooked,
        date:order.date,
        paymentStatus:order.paymentStatus,
        VehicleId: order.VehicleId,
        UserId: userId
        });
    res.json({
        success: "Order created successfully",data:order
    });

});


router.route("/update").get(validateToken, (req, res) => {
    // async and await waiting for the data to be inserting and doing other things
    
        // using sequelize to post data
        // accessing data
        // body has data in json
        const id = req.query['id'];
        console.log(id);
        const vehicle_order = req.body;
        const updated = VehicleOrder.update(vehicle_order, { where: { id: id } });
        res.json({status:"SUCCESS" ,message: "Vehicle order created successfully",data:vehicle_order });
    });


router.route("/delete").get(validateToken, (req, res) => {
            const id = req.query['id'];
            console.log(id);    
        
            const updated = VehicleOrder.destroy({ where: { id: id } });
            res.json({status:"SUCCESS" ,message: "Vehicle Order deleted successfully" });
        });

module.exports = router;