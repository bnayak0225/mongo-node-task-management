const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const {response} = require("express");
require('dotenv').config();
/* GET home page. */
router.get('/', function(req, res, next) {
    fetch('https://app.asana.com/api/1.0/projects/1204475989213577/tasks?opt_fields=completed,name,notes', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${process.env.ASANA_TOKEN}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(response=>response.json())
    .then(response => {
        if(response.data) {
            res.json(response)
        }
        else {
            res.json(response)
            res.status(401)
        }
    })
    .catch(err => {
        res.json({message: "something went wrong"})
        res.status(500)
    });
});

module.exports = router;