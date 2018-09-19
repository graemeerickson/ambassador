const express = require('express');
const router = express.Router();

const db = require('../models/user');

// get all users from the db whose role is 'Neighborhood Ambassador'
router.get('/', (req, res) => {
  db.find({ role: 'Neighborhood Ambassador' }, (err, ambassadors) => {
    res.send(ambassadors);
  })
})

module.exports = router;