const Post = require("../models/post");
const User = require("../models/user");

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
    user: req.context.me.id,
  });

  return res.send(post);
};

// Handle Post delete on POST.
exports.post_delete = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    await post.remove();
  }

  return res.send(post);
};

// Display Post update form on GET.
exports.post_update = (req, res) => {
  res.send("NOT IMPLEMENTED: Post update GET");
};
