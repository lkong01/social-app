const Post = require("../models/post");

// Display list of all Posts.
exports.post_list = (req, res) => {
  res.send("NOT IMPLEMENTED: Post list");
};

// Display detail page for a specific Post.
exports.post_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Post detail: ${req.params.id}`);
};

// Display Post create form on GET.
exports.post_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Post create GET");
};

// Handle Post create on POST.
exports.post_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Post create POST");
};

// Display Post delete form on GET.
exports.post_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Post delete GET");
};

// Handle Post delete on POST.
exports.post_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Post delete POST");
};

// Display Post update form on GET.
exports.post_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Post update GET");
};

// Handle post update on POST.
exports.post_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Post update POST");
};
