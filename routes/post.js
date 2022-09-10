const express = require("express");
const router = express.Router();
const passport = require("passport");

// Require controller modules.
const user_controller = require("../controllers/userController");
const post_controller = require("../controllers/postController");

// POST request for creating Post.
router.post("/", post_controller.post_create);

// GET request for one Post.
router.get("/:id", post_controller.post_detail);

// POST request to delete Post.
router.delete("/:id", post_controller.post_delete);

// GET request to update Post.
router.put("/:id", post_controller.post_update);

module.exports = router;
