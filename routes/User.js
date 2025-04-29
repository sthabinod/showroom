const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();
const { User, Company,Contact,Vehicle,MaintenanceRequest,VehicleParts,PartsOrder } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middleware/AuthMiddleware");

router.route("/").get(validateToken, async(req, res) => {
    const users = await User.findAll();
    res.json(users);
});




router.route("/contact").get(validateToken, async (req, res) => {
    const userId = req.user.id
    showContact =  await Contact.findAll({
        where: {
          UserId:userId,
        },
      });
    res.json(showContact);
});

router.route("/dashboard").get(validateToken, async (req, res) => {
    const userId = req.user.id
    count_user =  await User.count();
    const count_vehicle_order = await MaintenanceRequest.count({
        where: {
          UserId: userId, // Filter by UserId to count requests specific to the user
        },
      });

    res.json({"user":count_user,"vehicle_order":count_vehicle_order});
});



router.route("/contact").post(validateToken, async (req, res) => {
    const contact = req.body;
    const userId = req.user.id

    if (contact.email !== "" && contact.name !== "" && contact.address !== "" && contact.phone_number !== "") {
            const contactObject = await Contact.create({email:contact.email,phone_number:contact.phone_number,address:contact.address,full_name:contact.full_name,UserId:userId});
            res.json({
                contact:contact,
                success: "Your contact created successfully....",
            });
            
    } else {
        res.json({ error: "Fields required!" });
    }
    
    
});


router.route("/login_user").post(async(req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
        res.json({ error: "User not found" });
        return;
    }

    if (password != user.password) {
        res.json({ error: "No correct password" });
        return;
    }
    const accessToken = sign({
            username: user.username,
            id: user.id,
            isCompany: user.isCompany,
            email: user.email,
            password: user.password,
        },
        "important"
    );
    res.json(accessToken);
});

router.route("/").post(async(req, res) => {
    const user = req.body;
    const checkUser = await User.findOne({ where: { username: user.username } });

    if (user.email !== "" && user.password !== "" && user.username !== "") {
        if (!checkUser) {
            const userObject = User.create(user);
            res.json({
                success: "User created successfully",
            });
        } else {
            console.log("I m");
            res.json({ error: "User already found" });
        }
    } else {
        res.json({ error: "Empty Fields" });
    }
});

router.route("/update").put(validateToken, async(req, res) => {
    const { username, password } = req.body;
    const updateUser = req.body;
    const userId = req.user.id;
    const updated = await User.update(updateUser, { where: { id: userId } });
    res.json({status:"SUCCESS" ,message: "User updated successfully" });
});


router.route("/update").put(validateToken, async(req, res) => {
        const { username, password } = req.body;
        const updateUser = req.body;
        const userId = req.user.id;
        const updated =await User.update(updateUser, { where: { id: userId } });
        res.json({status:"SUCCESS" ,message: "User updated successfully" });
    });

    router.route("/admin/update").get(validateToken, async(req, res) => {
            const { username, password } = req.body;
            const updateUser = req.body;
            const id = req.query['id'];
            console.log(id);
            const updated = await User.update(updateUser, { where: { id: id } });
            res.json({status:"SUCCESS" ,message: "User updated successfully" });
        });
    

        router.route("/delete").get(validateToken, (req, res) => {
            const id = req.query['id'];
            console.log(id);
        
            const updated = User.destroy({ where: { id: id } });
            res.json({status:"SUCCESS" ,message: "User deleted successfully" });
        });

router.route("/auth").get(validateToken, (req, res) => {

    const userId = req.user;
    console.log(userId);
    res.json(userId);
});

router.route("/company-profile").put(validateToken, async(req, res) => {
   
    const profile = await Company.update(req.body, { where: { id: 1 } });
    res.json({status:"SUCCESS" ,message: "Company profile updated successfully" });
});

module.exports = router;