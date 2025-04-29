const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();
const { MaintenanceRequest,Customer } = require("../models");
const Sequelize = require("sequelize");
const { validateToken } = require("../middleware/AuthMiddleware");

router.route("/by-user").get(validateToken,async(req,res)=>{
    const userId = req.user.id;
    getRelatedOrder = await MaintenanceRequest.findAll({ where: { UserId: userId } });
    res.json(getRelatedOrder);
});


router.route("/").get(validateToken,async(req,res)=>{
    const userId = req.user.id

    const orderObject = await MaintenanceRequest.findAll({where:{
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
    console.log(req.body)
    const order = req.body;
    console.log(order);
    const userId = req.user.id
    console.log(userId);
    const orderToAdd = await MaintenanceRequest.create({
        isBooked:order.isBooked,
        date:order.date,
        paymentStatus:true,
        UserId: userId,
        accepted:false
        });
    res.json({
        success: "Maintenance request created successfully",data:order
    });

});


router.route("/update").put(validateToken, async(req, res) => {
        const id = req.query['id'];
        console.log(id);
        const vehicle_order = req.body;
        const updated = await MaintenanceRequest.update(vehicle_order, { where: { id: id } });
        res.json({status:"SUCCESS" ,message: "Maintenance request updated successfully",data:vehicle_order });
    });


router.route("/delete").delete(validateToken, async(req, res) => {
            const id = req.query['id'];
            console.log(id);    
            const updated = await MaintenanceRequest.destroy({ where: { id: id } });
            res.json({status:"SUCCESS" ,message: "Maintenance request deleted successfully" });
        });

module.exports = router;