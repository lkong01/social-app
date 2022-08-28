const express = require("express");
const router = express.Router();

// Require controller modules.
const user_controller = require("../controllers/userController");
const post_controller = require("../controllers/postController");

// GET request for list of all Post items.
router.get("/", post_controller.post_list);

// GET request for one Post.
router.get("/post/:id", post_controller.post_detail);

// POST request for creating Post.
router.post("/post/create", post_controller.post_create);

// POST request to delete Post.
router.delete("/post/:id/delete", post_controller.post_delete);

// GET request to update Post.
router.put("/post/:id/update", post_controller.post_update);

module.exports = router;
