const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
require('dotenv').config();
/* GET home page. */
router.put('/', function(req, res, next) {
    console.log(req.body)
    const status = req.body.status
    const gid = req.body.gid
    const bodyData = {
        "data": {"completed": status}
    }
    fetch(`https://app.asana.com/api/1.0/tasks/${gid}?opt_fields=completed,name,notes`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${process.env.ASANA_TOKEN}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
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
