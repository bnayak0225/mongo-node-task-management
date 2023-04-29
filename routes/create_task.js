const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const create_task = require("../model/createTask")
require('dotenv').config();
/* GET home page. */
router.post('/', function(req, res, next) {
    const data = {
        name: req.body.name,
        description: req.body.description,
        status: false,
        user: "Biswajit Nayak"
    }
    create_task(data)
        .then(resData => {
            if(resData){
                res.json({message: "Task created", id: resData})
                res.status(200)
            }
            else {
                res.json({message: "Not able to create data", created: false})
                res.status(401)
            }
        })
        .catch(err => {
            res.json({message: "something went wrong"})
            res.status(500)
        });
});

module.exports = router;
