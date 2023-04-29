const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const updateTask = require("../model/updateTask")
require('dotenv').config();
/* GET home page. */
router.put('/', function(req, res, next) {
    const id = req.body.id
    const data = {
        status: req.body.status,
    }
    updateTask(id, data)
        .then(resData => {
            if(resData){
                res.json({message: "status updated", status: true})
                res.status(200)
            }
            else {
                res.json({message: "Not able to update status", status: false})
                res.status(401)
            }
        })
        .catch(err => {
            res.json({message: "something went wrong"})
            res.status(500)
        });
});

module.exports = router;
