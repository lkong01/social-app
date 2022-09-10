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

var app = express();
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const postRouter = require("./routes/post");
const commentRouter = require("./routes/comment");

const User = require("./models/user");

//mongoose connection
const mongoDB = process.env.DATABASE_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(async (req, res, next) => {
  req.context = {
    me: await User.findByLogin("lk"),
  };
  next();
});

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

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("cats"));
app.use(express.static(path.join(__dirname, "public")));

// const corsOptions = {
//   //To allow requests from client
//   origin: false,
//   credentials: true,
//   //exposedHeaders: ["set-cookie"],
//   // allowHeaders: ["Content-Type", "Authorization"],
// };
// app.use(cors(corsOptions));
// const corsConfig = {
//   origin: true,
//   credentials: true,
// };

// app.use(cors(corsConfig));
// app.options("*", cors(corsConfig));
// app.use(cors());
const corsConfig = {
  credentials: true,
  origin: "http://localhost:3001",
};
app.use(cors(corsConfig));

// app.use(function (req, res, next) {
//   // console.log(req.user);
//   res.locals.currentUser = req.user;
//   next();
// });
// app.all("*", function (req, res, next) {
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     req.header("origin") ||
//       req.header("x-forwarded-host") ||
//       req.header("referer") ||
//       req.header("host")
//   );
//   next();
// });
// passport.use(
//   new LocalStrategy((username, password, done) => {
//     User.findOne({ username: username }, (err, user) => {
//       console.log(password, user, bcrypt.compare(user.password, password));
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false, { message: "Incorrect username" });
//       }
//       if (!bcrypt.compare(user.password, password)) {
//         return done(null, false, { message: "Incorrect password" });
//       }
//       return done(null, user);
//     });
//   })
// );

// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });
passport.use(
  new LocalStrategy((username, password, done) => {
    // sign in with either username or password.
    User.findOne({ username: username }, (err, user) => {
      if (err) throw err;
      if (!user) return done(null, false);

      bcrypt.compare(password, user.password, (err, result) => {
        console.log(password, user, result);
        if (err) throw err;
        if (result === true) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });
  })
);

passport.serializeUser((user, cb) => {
  console.log("serilize");
  cb(null, user.id);
});
passport.deserializeUser((id, cb) => {
  User.findOne({ _id: id }, (err, user) => {
    console.log("deserilieze");
    // const userInformation = {
    //   username: user.username,
    // };
    cb(err, user);
  });
});
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
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter); // Add catalog routes to middleware chain.
app.use("/post", postRouter);
app.use("/comment", commentRouter);

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
