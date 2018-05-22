const express = require('express');
const router = express.Router();

const db = require('../models/user');

// get all users from db
router.get('/', (req, res) => {
  console.log("Received '/user' GET request");
  db.find({}, (err, users) => {
    res.send(users);
  })
});

// get specific user by ID from db
router.get('/:id', (req, res) => {
  console.log("Received 'user/:id' GET request");
  db.findById(req.params.id, (err, user) => {
    res.send(user);
  })
})

// update prospective homebuyer's target city, state, & location coordinates
router.put('/:id', (req, res) => {
  console.log("Received 'user/:id' PUT request");
  db.findByIdAndUpdate(req.params.id, {$set:req.body}, (err, user) => {
    if (err) { res.status(403).send('PUT request failed') };
    res.send(user);
  })
})

module.exports = router;