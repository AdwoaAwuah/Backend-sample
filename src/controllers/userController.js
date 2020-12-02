const User = require("../models/userModel");
function handleError(error) {
  let err = { username: "", email: "", password: "" };

  if (error.message === "incorrect username") {
    err.username = "that user does not exist";
  }

  if (error.message === "incorrect email") {
    err.email = "the email is not valid";
  }

  if (error.message === "incorrect password") {
    err.password = "the password is incorrect";
  }

  if (error.code === 11000) {
    err.email = "the email is registered already";

    return err;
  }

  if (error.message.includes("user validation failed")) {
    Object.values(error.errors).forEach(({ properties }) => {
      err[properties.path] = properties.message;
    });
  }

  return err;
}

const userCtrl = {};

//create a user = POST method
userCtrl.createUser = async (req, res) => {
  try {
    const newUser = User(req.body);
    let result = await newUser.save();
    res.status(200).send({ message: "Your account has been created", result });
  } catch (error) {
    const warnings = handleError(error);
    res.status(400).json({ warnings });
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
    const warnings = handleError(error);
    res.status(400).json({ warnings });
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
    const warnings = handleError(error);
    res.status(400).json({ warnings });
  }
};
//delete a user ccount =DELETE method

userCtrl.deleteUserDetails = async (req, res) => {
  try {
    let person = await User.findOneAndDelete({ _id: req.params.id });
    res.status(200).send({ message: "Account has been deleted", person });
  } catch (error) {
    const warnings = handleError(error);
    res.status(400).json({ warnings });
  }
};

module.exports = userCtrl;
