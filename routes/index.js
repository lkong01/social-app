var express = require("express");
var router = express.Router();
const index_controller = require("../controllers/indexController");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var fs = require("fs");
var path = require("path");
const multer = require("multer");

const User = require("../models/user");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

const DIR = "./public/images/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("file", file);
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, Date.now() + "-" + fileName);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.post("/signup", upload.single("profileImg"), (req, res, next) => {
  //encrypt the password first
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    // if err, do something
    // otherwise, store hashedPassword in DB
    const url = req.protocol + "://" + req.get("host");

    const avatar = req.file ? req.file.filename : "user-default-avatar.png";

    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      profileImg: url + "/images/" + avatar,
    });

    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User registered successfully!",
          userCreated: {
            _id: result._id,
            profileImg: result.profileImg,
          },
        });
      })
      .catch((err) => {
        console.log(err),
          res.status(500).json({
            error: err,
          });
      });
  });
});

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
