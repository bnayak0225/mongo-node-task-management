var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
require('dotenv').config();
/* GET home page. */
router.post('/', function(req, res, next) {
    console.log(req.body);
    const summary= req.body.summary
    const description = req.body.description
 const bodyData = {
  "fields": {
    "project": {
      "id": "10000"
    },
    "issuetype": {
        "id": "10001"
    },
    "description": {
      "content": [
        {
          "content": [
            {
              "text": description,
              "type": "text"
            }
          ],
          "type": "paragraph"
        }
      ],
      "type": "doc",
      "version": 1
    },
    "summary": summary
  },
  "transition": {
    "id": "11",
    "looped": true
  }
};

  fetch('https://myworkdoneweb.atlassian.net/rest/api/3/issue', {
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
  .then(response=>response.json())
  .then(response => {
      res.json({data: response})
  })
  .catch(err => {
      res.json({message: "something went wrong"})
      res.status(500)
  });
});

module.exports = router;
