const express = require('express');
const router = express.Router();

const db = require('../models/user');

router.post('/', (req, res) => {
  console.log('Received POST request');
  console.log('req.body.user:',req.body.user);
  db.find({_id: req.body.user.id}, (err, user) => {
    res.send(user);
  })
  // db.User.findById(res.locals.currentUser._id, function(err, user) {
  //   const userRecipe = user.recipes.filter( (recipe) => {
  //     return recipe._id == recipeId;
  //   })
  //   console.log('userRecipe:', userRecipe);
  //   res.render('viewRecipe', {userRecipe: userRecipe});
  // })
})

router.get('/:id', (req, res) => {
  console.log('Received GET request');
  console.log('params:',req.params.id);
  db.findById(req.params.id, (err, user) => {
    res.send(user);
  })
  // db.User.findById(res.locals.currentUser._id, function(err, user) {
  //   const userRecipe = user.recipes.filter( (recipe) => {
  //     return recipe._id == recipeId;
  //   })
  //   console.log('userRecipe:', userRecipe);
  //   res.render('viewRecipe', {userRecipe: userRecipe});
  // })
})

module.exports = router;