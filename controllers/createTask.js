const express = require('express');
const router = express.Router();
const {getData} = require('../services')

/* GET home page. */
router.post('/:mode', function(req, res, next) {
    const mode = req.params.mode
    getData[mode].createTask({...req.body})
        .then(response => {
            res.json({data: response})
        })
        .catch(err => {
            res.json({message: "something went wrong"})
            res.status(500)
        });
});

module.exports = router;
