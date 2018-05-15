const express = require('express');
const router = express.Router();

const db = require('../models/user');

// get all users from the db whose role is 'Neighborhood Ambassador'
router.get('/', (req, res) => {
  console.log("Received '/ambassadors' GET request");
  db.find({}, (err, users) => {
    let ambassadors = [];
    users.forEach( ambassador => {
      if(ambassador.role[0] === 'Neighborhood Ambassador') {
        ambassadors.push(ambassador);
      }
    })
    res.send(ambassadors);
  })
})

module.exports = router;