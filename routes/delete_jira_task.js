var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
require('dotenv').config();
/* GET home page. */
router.delete('/', function(req, res, next) {
    const taskId = req.query.taskId
    fetch(`https://myworkdoneweb.atlassian.net/rest/api/3/issue/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Basic ${Buffer.from(
              `bn0225@gmail.com:${process.env.JIRA_TOKEN}`
          ).toString('base64')}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
    })
    .then(response=>response.text())
    .then(response => {
        console.log(response);
        res.json({data: "deleted"})
    })
    .catch(err => {
        console.log(err);
        res.json({message: "something went wrong"})
        res.status(500)
    });
});

module.exports = router;
