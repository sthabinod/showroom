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
    const order = req.body;
    console.log(order);
    const userId = req.user.id
    console.log(userId);
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


router.route("/update").put(validateToken, async(req, res) => {
        const id = req.query['id'];
        console.log(id);
        const vehicle_order = req.body;
        const updated = await VehicleOrder.update(vehicle_order, { where: { id: id } });
        res.json({status:"SUCCESS" ,message: "Vehicle order created successfully",data:vehicle_order });
    });


router.route("/delete").delete(validateToken, async(req, res) => {
            const id = req.query['id'];
            console.log(id);    
            const updated = await VehicleOrder.destroy({ where: { id: id } });
            res.json({status:"SUCCESS" ,message: "Vehicle Order deleted successfully" });
        });

module.exports = router;