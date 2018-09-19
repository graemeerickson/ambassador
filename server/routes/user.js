require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const db = require('../models/user');

// get all users from db
router.get('/', (req, res) => {
  db.find({}, (err, users) => {
    res.send(users);
  })
});

// get specific user by ID from db
router.get('/:id', (req, res) => {
  db.findById(req.params.id, (err, user) => {
    res.send(user);
  })
})

// update prospective homebuyer's target city, state, & location coordinates
router.put('/:id', (req, res) => {
  db.findByIdAndUpdate(req.params.id, {$set:req.body}, {new: true}, (err, user) => {
    if (err) { res.status(403).send('PUT request failed') };
    const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
    res.send({ user: user, token: token });
  })
})

module.exports = router;