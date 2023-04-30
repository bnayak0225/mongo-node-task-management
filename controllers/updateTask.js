const express = require('express');
const router = express.Router();
const {getData} = require('../services')

/* GET home page. */
router.put('/:mode', function(req, res, next) {
    const mode = req.params.mode
    const body = req.body
    console.log(mode, body);
    getData[mode].updateTask({...body})
        .then(response => {
            console.log(response);
            res.json({data: {message: "updated"}})
        })
        .catch(err => {
            console.log(err);
            res.json({message: "something went wrong"})
            res.status(500)
        });
});

module.exports = router;
