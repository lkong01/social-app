const Post = require("../models/post");
const User = require("../models/user");
const { post } = require("../routes");

// Display list of all Posts.
exports.post_list = async (req, res) => {
  const posts = await Post.find();
  return res.send(posts);
};

// Display detail page for a specific Post.
exports.post_detail = async (req, res) => {
  const post = await Post.findById(req.params.id);
  return res.send(post);
};

// Handle Post create on POST.
exports.post_create = async (req, res) => {
  const post = await Post.create({
    text: req.body.text,
    author: req.context.me._id,
  });

  return res.send(post);
};

// Handle Post delete on POST.
exports.post_delete = async (req, res) => {
  const post = await Post.findById(req.params.id);

  //check if the person owns the post before delete
  if (post && req.context.me._id.equals(post.author)) {
    await post.remove();
  }

  return res.send(post);
};

// Display Post update form on put.
exports.post_update = async (req, res) => {
  const post = await Post.findById(req.params.id);

  //check if the person owns the post before delete
  if (post && req.context.me._id.equals(post.author)) {
    const updatedPost = await new Post({
      text: req.body.text,
      author: req.context.me._id,
      _id: req.params.id,
    });

    Post.findByIdAndUpdate(req.params.id, updatedPost, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated User : ", docs);
      }
    });
  }
  return res.send(post);
};
