const Post = require("../models/post");
const User = require("../models/user");

// get all posts.
exports.posts_list = async (req, res) => {
  // if (req.isAuthenticated()) {
  const posts = await Post.find().sort({ createdAt: "desc" });
  return res.send(posts);
  //   } else {
  //     res.send("You are not authenticated");
  //   }
  // };
};

exports.post_create = (req, res) => {
  // if (req.isAuthenticated()) {
  const post = Post.create({
    text: req.body.text,
    author: req.context.me._id,
  })
    .then(function (response) {
      res.send(post);
    })
    .catch(function (error) {
      console.log(error);
    });

  // } else {
  //   res.send("You are not authenticated");
  // }
};

// get a specific post.
exports.post_detail = async (req, res) => {
  const post = await Post.findById(req.params.id);

  return res.send(post);
};

exports.post_update = async (req, res) => {
  const post = await Post.findById(req.params.id);

  //check if the person owns the post before delete
  if (
    post &&
    req.isAuthenticated &&
    res.locals.currentUser._id.equals(post.author)
  ) {
    const updatedPost = await new Post({
      text: req.body.text,
      author: res.locals.currentUser._id,
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

exports.post_delete = async (req, res) => {
  const post = await Post.findById(req.params.id);

  //check if the person owns the post before delete
  if (
    post
    // req.isAuthenticated &&
    // res.locals.currentUser._id.equals(post.author)
  ) {
    await post.remove();
    return res.send(post);
  } else {
    return res.send("no such post");
  }
};
