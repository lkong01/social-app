const Comment = require("../models/comment");
const User = require("../models/user");
const Post = require("../models/post");

exports.comments_list = () => {};
// get all comments of a post
exports.comments_list = async (req, res) => {
  // console.log(req.params);
  const comments = await Post.findById(req.params.id)
    .sort({ updatedAt: "desc" })
    .populate("comments");
  return res.send(comments);
  //   } else {
  //     res.send("You are not authenticated");
  //   }
  // };
};

exports.comment_create = async (req, res, next) => {
  const comment = await Comment.create({
    author: req.context.me._id,
    text: req.body.text,
    post: req.body.post,
  }).catch(function (error) {
    console.log(error);
    next(error);
  });
  console.log(req.params);
  if (comment) {
    await Post.findOneAndUpdate(
      { _id: req.body.post },
      {
        $push: {
          comments: comment._id,
        },
      }
    ).catch(function (error) {
      console.log(error);
    });
  }

  res.send(comment);
};

// get a specific comment.
exports.comment_detail = async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  return res.send(comment);
};

exports.comment_update = async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  //check if the person owns the comment before delete
  if (
    comment &&
    req.isAuthenticated &&
    res.locals.currentUser._id.equals(comment.author)
  ) {
    const updatedComment = await new Comment({
      text: req.body.text,
      author: res.locals.currentUser._id,
      _id: req.params.id,
    });

    Comment.findByIdAndUpdate(
      req.params.id,
      updatedComment,
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log("Updated User : ", docs);
        }
      }
    );
  }
  return res.send(comment);
};

exports.comment_delete = async (req, res) => {
  const comment = await Comment.findById(req.params.commentId);
  console.log(req.context.me._id, comment.author);
  //check if the person owns the comment before delete
  if (
    comment &&
    // req.isAuthenticated &&
    req.context.me._id.equals(comment.author)
  ) {
    await comment.remove();

    await Post.findOneAndUpdate(
      { _id: req.params.postId },
      {
        $pull: {
          comments: comment._id,
        },
      }
    ).catch(function (error) {
      console.log(error);
    });

    return res.send(comment);
  } else {
    return res.send("no such comment or not author");
  }
};
