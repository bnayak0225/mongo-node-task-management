const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const getTaskList = require("../model/getTaskList")
require('dotenv').config();
/* GET home page. */
router.get('/', function(req, res, next) {
    getTaskList()
        .then(data => {
            res.json({data: data})
        })
        .catch(err => {
            res.json({message: "something went wrong"})
            res.status(500)
        });
});

module.exports = router;
