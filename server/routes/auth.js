require('dotenv').config();
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var User = require('../models/user');

// POST /auth/login route - returns a JWT
router.post('/login', function(req, res) {
  console.log('/auth/login POST route');
  
  // first check if user exists
  User.findOne({ email: req.body.email })
    .then(function(user){
      // user not found, or password is incorrect
      if(!user || !user.password){ return res.status(403).send('User not found'); }
      
      // user exists; validate password
      // password is invalid
      if(!user.authenticated(req.body.password)){ return res.status(401).send('Invalid credentials'); }
      // password is valid; create token
      var token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
      // send token & user info
      res.send({ user: user, token: token });
    })
    .catch(function(err){
      console.log('err:', err)
      res.status(503).send('Database error');
    })
});

// POST /auth/signup route - create a user in the DB and then log them in
router.post('/signup', function(req, res) {
  console.log('/auth/signup POST route');
  
  // first check if the user already exists
  User.findOne({ email: req.body.email })
    // successful database call
    .then(function(user){
      // if user exists already, don't create a duplicate account. instead they should log in.
      if (user) {
        return res.status(400).send('User exists already');
      }

      // new user - create an account
      User.create(req.body)
        .then(function(createdUser){
          // make a token and sent it as JSON so that the user can remained logged in. toJSON function cleanses object of password
          var token = jwt.sign(createdUser.toJSON(), process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24 // 24 hours, in seconds
          });
          res.send({ user: createdUser, token: token });
        })
        .catch(function(err){
          console.log('err:', err);
          res.status(500).send('Could not create user in database');
        })
    })
    // unsuccessful database call
    .catch(function(err){
      console.log('err:', err);
      res.status(503).send('Database error')
    })
});

// This is checked on a browser refresh
router.post('/me/from/token', function(req, res) {
  // check header or url parameters or post parameters for token
  res.send({ user: req.user });
});

module.exports = router;