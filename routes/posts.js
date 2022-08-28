const express = require("express");
const router = express.Router();

// Require controller modules.
const user_controller = require("../controllers/userController");
const post_controller = require("../controllers/postController");

// GET request for creating a Post. .
router.get("/post/create", post_controller.post_create_get);

// POST request for creating Post.
router.post("/post/create", post_controller.post_create_post);

// GET request to delete Post.
router.get("/post/:id/delete", post_controller.post_delete_get);

// POST request to delete Post.
router.post("/post/:id/delete", post_controller.post_delete_post);

// GET request to update Post.
router.get("/post/:id/update", post_controller.post_update_get);

// POST request to update Post.
router.post("/post/:id/update", post_controller.post_update_post);

// GET request for one Post.
router.get("/post/:id", post_controller.post_detail);

// GET request for list of all Post items.
router.get("/posts", post_controller.post_list);
