var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 99
  },
  email: { // TODO: Need to add email validation
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 99
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 99
  },
  role: {
    type: [ String ]
  },
  homeAddressNumber: String,
  homeAddressStreet: {
    type: String
  },
  homeAddressCity: String,
  homeAddressState: String,
  homeAddressZip: Number,
  targetZip: Number
});

// Override 'toJSON' to prevent the password from being returned with the user
userSchema.set('toJSON', {
  transform: function(doc, user, options) {
    var returnJson = {
      id: user._id,
      email: user.email,
      name: user.name
    };
    return returnJson;
  }
});

// check to verify the password is correct
userSchema.methods.authenticated = function(password, callback) {
  return bcrypt.compareSync(password, this.password);
}

// Mongoose's version of a beforeCreate hook
userSchema.pre('save', function(next) {
  var hash = bcrypt.hashSync(this.password, 10);
  // store the hash as the user's password
  this.password = hash;
  next();
});

var User = mongoose.model('User', userSchema);

module.exports = User;
