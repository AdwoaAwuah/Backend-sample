const mongoose = require("mongoose");
//const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlenght: [5, "minimum username lenght is 5"],
    maxlenght: [16, "maximum username lenght is 16"],
    unique: true,
    required: [true, "please enter a username"],
    lowercase: true
  },

  email: {
    type: String,
    unique: true,
    required: [true, "the email field is required"],
    lowercase: true
  },

  password: {
    type: String,
    minlenght: 8,
    required: [true, "you must enter a password"]
  }
});

/*User.pre('save', function(next){
  if(this.password !== null undefined){
    bcrypt.hash(this.password,'secret-text', function(err,hash){
      this.password=hash
    })
  }next()
})*/
const User = mongoose.model("user", userSchema);
module.exports = User;
