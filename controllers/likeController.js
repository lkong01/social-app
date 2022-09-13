const Post = require("../models/post");

exports.likes_list = async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  return res.send(post.likes);
};

exports.like_detail = async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (post.likes.includes(req.context.me._id)) {
    return res.send(true);
  } else {
    return res.send(false);
  }
};

exports.like_create = async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post.likes.includes(req.context.me._id)) {
    await Post.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          likes: req.context.me._id,
        },
      }
    ).catch(function (error) {
      console.log(error);
    });
  }
  return res.send("liked");
};

exports.like_delete = async (req, res) => {
  await Post.findOneAndUpdate(
    { _id: req.params.id },
    {
      $pull: {
        likes: req.context.me._id,
      },
    }
  ).catch(function (error) {
    console.log(error);
  });

  return res.send("unliked");
};
