const mongoose = require("mongoose");
//const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, minlenght: 5, maxlenght: 16, unique: true },
  email: { type: String, unique: true },
  password: { type: String, minlenght: 8 }
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
