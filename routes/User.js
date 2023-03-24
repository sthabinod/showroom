const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();
const { User, Company } = require("../models");
const bcrypt = require("bcrypt");
// generate token using sign
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middleware/AuthMiddleware");

router.route("/").get(validateToken, async(req, res) => {
    const users = await User.findAll();
    res.json(users);
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

    // json web token is going to hash the username and id
    // third parameter is secret word to protect token
    const accessToken = sign({
            username: user.username,
            id: user.id,
            isCompany: user.isCompany,
            email: user.email,
            password: user.password,
        },
        "important"
    );

    // after getting this accessToken it is stored in sessionStorage and use as part of header when request is made
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
// async and await waiting for the data to be inserting and doing other things

    // using sequelize to post data
    // accessing data
    // body has data in json
    const { username, password } = req.body;
    const updateUser = req.body;
    // const hash = user.password
    // User.create({
    //     username: user.username,
    //     password: hash
    // })
    // res.json(hash);
    const userId = req.user.id;
    const updated = await User.update(updateUser, { where: { id: userId } });
    res.json({status:"SUCCESS" ,message: "User updated successfully" });
});


router.route("/update").put(validateToken, async(req, res) => {
    // async and await waiting for the data to be inserting and doing other things
    
        // using sequelize to post data
        // accessing data
        // body has data in json
        const { username, password } = req.body;
        const updateUser = req.body;
        // const hash = user.password
        // User.create({
        //     username: user.username,
        //     password: hash
        // })
        // res.json(hash);
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
    // using sequelize to post data
    // accessing data
    // body has data in json
    const userId = req.user;
    console.log(userId);
    res.json(userId);
});

router.route("/company-profile").put(validateToken, async(req, res) => {
    // using sequelize to post data
    // accessing data
    // body has data in json
    // const user = User.findOne({ where: { username: req.user.username } });
   
    const profile = await Company.update(req.body, { where: { id: 1 } });
    res.json({status:"SUCCESS" ,message: "Company profile updated successfully" });
});

module.exports = router;