var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
require('dotenv').config();
/* GET home page. */
router.get('/', function(req, res, next) {
  fetch(`https://myworkdoneweb.atlassian.net/rest/api/3/search?jql=project=10000`, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${Buffer.from(
          `bn0225@gmail.com:${process.env.JIRA_TOKEN}`
      ).toString('base64')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response=>response.json())
  .then(response => {
      if(response.errorMessage){
          res.json({message: "something went wrong"})
          res.status(500)
      }
      res.json({data: response.issues})
  })
  .catch(err => {
      res.json({message: "something went wrong"})
      res.status(500)
  });
});

module.exports = router;
