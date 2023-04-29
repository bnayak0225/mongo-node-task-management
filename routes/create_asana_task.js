const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
require('dotenv').config();
/* GET home page. */
router.post('/', function(req, res, next) {
    const name = req.body.name
    const notes = req.body.notes
    const bodyData = {
        "data": {
            "projects": [
                "1204475989213577"
            ],
            "name": name,
            "notes": notes,
            "assignee": "1204475676614286",
            "workspace": "1204475676614296"
        }
    }
    fetch('https://app.asana.com/api/1.0/tasks?opt_fields=name,notes,completed', {
        method: 'POST',
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
