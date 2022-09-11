const express = require("express");
const router = express.Router();
const passport = require("passport");

// Require controller modules.
const user_controller = require("../controllers/userController");
const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController");
const like_controller = require("../controllers/likeController");

// POST request for creating Post.
router.post("/", post_controller.post_create);

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
router.post("/:id/like", like_controller.like_create);
router.delete("/:id/like", like_controller.like_delete);

module.exports = router;
