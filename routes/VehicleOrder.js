const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();
const { VehicleOrder,Customer } = require("../models");
const Sequelize = require("sequelize");
const { validateToken } = require("../middleware/AuthMiddleware");



router.route("/").get(validateToken,async(req,res)=>{
    const userId = req.user.id

    const orderObject = await VehicleOrder.findAll({where:{
        UserId:cuserId}})

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
        date:order.date,
        VehicleId: order.VehicleId,
        UserId: order.userId,
        paymentStatus:order.paymentStatus,
        isBooked:order.isBooked });
    res.json({
        success: "Order created successfully",data:order
    });

});
module.exports = router;