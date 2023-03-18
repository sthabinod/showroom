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
module.exports = router;