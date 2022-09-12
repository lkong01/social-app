const User = require("../models/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

//directly at index router now
// exports.signUp = async (req, res) => {
// };

//also at index router now
// exports.login = (req, res, next) => {
//   return res.send(req);
// };

exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    res.send({ message: "you're logged out" });
  });
};
