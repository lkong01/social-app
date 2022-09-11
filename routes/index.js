var express = require("express");
var router = express.Router();
const index_controller = require("../controllers/indexController");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/signup", index_controller.signUp);

router.post(
  "/login",
  // passport.authenticate("local", {
  //   failureRedirect: "/",
  // }),
  (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;

      if (!user) res.send("Incorrect username or password.");
      else {
        req.logIn(user, async (err) => {
          if (err) throw err;

          res.send(req.user);
        });
      }
    })(req, res, next);
  }
  // index_controller.login
);
router.get("/logout", index_controller.logout);

module.exports = router;
