var express = require("express");
var router = express.Router();
const user_controller = require("../controllers/userController");
const post_controller = require("../controllers/postController");

//get user info
router.get("/:id", user_controller.user_detail);

//get user posts
router.get("/:id/posts", post_controller.user_posts);

router.get("/search/:word", user_controller.user_search);

module.exports = router;
