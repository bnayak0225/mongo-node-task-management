const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const deleteTask = require("../model/deleteTask")
require('dotenv').config();
/* GET home page. */
router.delete('/', function(req, res, next) {
    const id = req.query.id
    console.log(id, "id");
    deleteTask(id)
        .then(resData => {
            if(resData){
                res.json({ message: "Deleted issue", status: true })
                res.status(200)
            }
            else {
                res.json({ message: "Not able to delete issue", status: false })
                res.status(401)
            }
        })
        .catch(err => {
            res.json({message: "something went wrong"})
            res.status(500)
        });
});

module.exports = router;
