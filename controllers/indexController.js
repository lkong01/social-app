const User = require("../models/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

exports.signUp = async (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    // if err, do something
    // otherwise, store hashedPassword in DB
    if (err) {
      return next(err);
    } else {
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
      }).save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
    }
  });
};

exports.login = (req, res, next) => {
  //if (err) next(err);
  console.log("here");
  return res.send(req);
};

exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    res.send({ message: "you're logged out" });
  });
};
