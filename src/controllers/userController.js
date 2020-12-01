const User = require("../models/userModel");

const userCtrl = {};

//create a user = POST method
userCtrl.createUser = async (req, res) => {
  try {
    const newUser = User(req.body);
    let result = await newUser.save();
    res.status(200).send({ message: "Your account has been created", result });
  } catch (error) {
    console.log(error);
  }
};

//read a user detail=GET method
userCtrl.getUserDetails = async (req, res) => {
  try {
    let person = await User.find({ username: req.body.username });
    res.status(200).send({ message: "we found the user", person });
    if (!person) {
      res.status(400).send({ message: "user does not exist" });
    } else {
      res
        .status(200)
        .send({ message: "welcome to earth, the user exists", person });
    }
  } catch (error) {
    console.log(error);
  }
};

//update a user detail = UPDATE/PUT

userCtrl.updateUserDetails = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let person = await User.findOneAndupdate(
      { _id: req.params.id },
      { username, email, password }
    );
    res.status(200).send({ message: "Account has been updated", person });
  } catch (error) {
    console.log(error);
  }
};
//delete a user ccount =DELETE method

userCtrl.deleteUserDetails = async (req, res) => {
  try {
    let person = await User.findOneAndDelete({ _id: req.params.id });
    res.status(200).send({ message: "Account has been deleted", person });
  } catch (error) {
    console.log(error);
  }
};

module.exports = userCtrl;
