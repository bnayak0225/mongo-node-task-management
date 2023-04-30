const express = require('express');
const router = express.Router();
const {getData} = require('../services')

/* GET home page. */
router.delete('/:mode', function(req, res, next) {
    const mode = req.params.mode
    getData[mode].deleteTask({...req.query})
        .then(response => {
            res.json({data: {message: "updated"}})
        })
        .catch(err => {
            res.json({message: "something went wrong"})
            res.status(500)
        });
});

module.exports = router;
