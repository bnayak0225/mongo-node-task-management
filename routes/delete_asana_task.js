const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
require('dotenv').config();
/* GET home page. */
router.delete('/', function(req, res, next) {
    const gid = req.query.gid
    fetch(`https://app.asana.com/api/1.0/tasks/${gid}?opt_fields=gid`, {
        method: 'DELETE',
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
