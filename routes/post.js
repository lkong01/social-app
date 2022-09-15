const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");

// Require controller modules.
const user_controller = require("../controllers/userController");
const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController");
const like_controller = require("../controllers/likeController");

const Post = require("../models/post");
const User = require("../models/user");

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

// POST request for creating Post.
router.post("/", upload.single("image"), async (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");

  const imgUrl = req.file ? `${url}/images/${req.file.filename}` : "";

  // console.log(req.body.text, req.context.me._id, imgName, url);
  const post = new Post({
    text: req.body.text,
    author: req.context.me._id,
    image: imgUrl,
  });

  if (post) {
    await User.findOneAndUpdate(
      { _id: req.context.me._id },
      {
        $push: {
          posts: post._id,
        },
      }
    ).catch(function (error) {
      console.log(error);
    });
  }

  post
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

// GET request for one Post.
router.get("/:id", post_controller.post_detail);

// POST request to delete Post.
router.delete("/:id", post_controller.post_delete);

// GET request to update Post.
router.put("/:id", post_controller.post_update);

/*********** comment controllers***************/
router.get("/:id/comments", comment_controller.comments_list);

router.post("/:id/comment", comment_controller.comment_create);

router.get("/:postId/comment/:commentId", comment_controller.comment_detail);

// comment request to delete comment.
router.delete("/:postId/comment/:commentId", comment_controller.comment_delete);

// GET request to update comment.
router.put("/:postId/comment/:commentId", comment_controller.comment_update);

/***********  like controller ***************/
router.get("/:id/likes", like_controller.likes_list);
router.get("/:id/like", like_controller.like_detail);
router.post("/:id/like", like_controller.like_create);
router.delete("/:id/like", like_controller.like_delete);

module.exports = router;
