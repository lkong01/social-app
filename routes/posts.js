const express = require("express");
const router = express.Router();
const passport = require("passport");

// Require controller modules.
const user_controller = require("../controllers/userController");
const post_controller = require("../controllers/postController");

// GET request for list of all Post items.
router.get("/", passport.authenticate("session"), post_controller.posts_list);

module.exports = router;
