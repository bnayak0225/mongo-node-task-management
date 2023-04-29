var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
require('dotenv').config();
/* GET home page. */
router.get('/', function(req, res, next) {
    const bodyData = `{
      "fields": {
        "description": {
          "content": [
            {
              "content": [
                {
                  "text": "Order entry fails when selecting supplier1.",
                  "type": "text"
                }
              ],
              "type": "paragraph"
            }
          ],
          "type": "doc",
          "version": 1
        },
        "summary": "Main order flow broken1"
      },
      "transition": {
        "id": "21",
        "looped": true
      }
    }`;
  fetch('https://myworkdoneweb.atlassian.net/rest/api/3/issue/WEB-3', {
    method: 'PUT',
    headers: {
      'Authorization': `Basic ${Buffer.from(
          `bn0225@gmail.com:${process.env.JIRA_TOKEN}`
      ).toString('base64')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: bodyData
  })
      .then(response => {
        console.log(
            `Response: ${response.status} ${response.statusText}`
        );
        return response.text();
      })
      .then(text => console.log(text))
      .catch(err => console.error(err));
  res.send("hello")
});

module.exports = router;
