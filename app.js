var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
var cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

var app = express();
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const postsRouter = require("./routes/posts");
const postRouter = require("./routes/post");

const User = require("./models/user");

//mongoose connection
const mongoDB = process.env.DATABASE_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(
  session({
    secret: "cats",
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: "lax",
      // secure: false,
      secure: false,
    },
  })
);
// app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());

app.use(async (req, res, next) => {
  req.context = {
    me: await User.findByLogin(),
    // me: req.user,
  };

  next();
});

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;

  // console.log("who am i", req.user);

  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("cats"));
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, "client/build")));

const corsConfig = {
  credentials: true,
  origin: "http://localhost:3001",
};
app.use(cors(corsConfig));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});
app.set("trust proxy", 1);

//Routes
app.use("/api/", indexRouter);
app.use("/api/user", userRouter);
app.use("/api/posts", postsRouter); // Add catalog routes to middleware chain.
app.use("/api/post", postRouter);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
