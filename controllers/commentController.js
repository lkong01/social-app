const Comment = require("../models/Comment");
const User = require("../models/user");

exports.comment_create = (req, res) => {
  const comment = Comment.create({
    author: req.context.me._id,
    text: req.body.text,
  })
    .then(function (response) {
      res.send(comment);
    })
    .catch(function (error) {
      console.log(error);
    });
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
  const comment = await Comment.findById(req.params.id);

  //check if the person owns the comment before delete
  if (
    comment &&
    // req.isAuthenticated &&
    req.context.me._id.equals(comment.author)
  ) {
    await comment.remove();
    return res.send(comment);
  } else {
    return res.send("no such comment");
  }
};
