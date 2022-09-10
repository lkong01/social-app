const express = require("express");
const router = express.Router();

const comment_controller = require("../controllers/commentController");

router.post("/", comment_controller.comment_create);

router.get("/:id", comment_controller.comment_detail);

// comment request to delete comment.
router.delete("/:id", comment_controller.comment_delete);

// GET request to update comment.
router.put("/:id", comment_controller.comment_update);

module.exports = router;
