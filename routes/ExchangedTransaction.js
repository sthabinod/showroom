const express = require("express");
const { sequelize } = require("../models");
const router = express.Router();
const { ExchangedTransaction } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");


router.route("/").get(validateToken, async(req, res) => {
    showExchangedTransaction = await ExchangedTransaction.findAll();
    res.json(showExchangedTransaction);
});

// async and await waiting for the data to be inserting and doing other things
router.route("/").post((req, res) => {
    // using sequelize to post data
    // accessing data
    // body has data in json
    const exchangedTransaction = req.body;
    ExchangedTransaction.create(exchangedTransaction);
    res.json(exchangedTransaction);
});

module.exports = router;