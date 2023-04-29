var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const {jiraTransition} = require("../variables");
require('dotenv').config();
/* GET home page. */
router.put('/', function(req, res, next) {
    const statusId = req.body.statusId
    const taskId = req.body.taskId
    console.log(req.body);
    const bodyData = {
      "transition": {
        "id": jiraTransition[statusId],
      }
    };
  fetch(`https://myworkdoneweb.atlassian.net/rest/api/3/issue/${taskId}/transitions`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(
          `bn0225@gmail.com:${process.env.JIRA_TOKEN}`
      ).toString('base64')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyData)
  })
  .then(response=>response.text())
  .then(response => {
      res.json({data: {message: "updated"}})
  })
  .catch(err => {
      console.log(err);
      res.json({message: "something went wrong"})
      res.status(500)
  });
});

module.exports = router;
