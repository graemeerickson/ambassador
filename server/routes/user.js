const express = require('express');
const router = express.Router();

const db = require('../models/user');

router.post('/', (req, res) => {
  console.log("Received '/user' POST request");
  console.log('req.body.user:',req.body.user);
  db.find({_id: req.body.user.id}, (err, user) => {
    res.send(user);
  })
})

router.get('/', (req, res) => {
  console.log("Received '/user' GET request");
  console.log('params:',req.params.id);
  db.find({}, (err, users) => {
    res.send(users);
  })
});

router.get('/:id', (req, res) => {
  console.log("Received 'user/:id' GET request");
  db.findById(req.params.id, (err, user) => {
    res.send(user);
  })
})

// update prospective homebuyer's target city, state, & location coordinates
router.put('/:id', (req, res) => {
  console.log("Received 'user/:id' PUT request");
  console.log('req.params:', req.params)
  console.log('req.body:', req.body)
  db.findByIdAndUpdate(req.params.id, {$set:req.body}, (err, user) => {
    if (err) { res.status(403).send('PUT request failed') };
    res.send(user);
  })
})

module.exports = router;