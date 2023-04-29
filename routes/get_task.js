const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const getTask = require("../model/getTask")
require('dotenv').config();
/* GET home page. */
router.get('/', function(req, res, next) {
    const id = req.query.id
    getTask(id)
        .then(resData => {
            res.json({data: resData})
        })
        .catch(err => {
            res.json({message: "something went wrong"})
            res.status(500)
        });
});

module.exports = router;
