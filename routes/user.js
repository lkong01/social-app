var express = require("express");
var router = express.Router();
const friend_controller = require("../controllers/friendController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/:id/friends", friend_controller.friends_list);

module.exports = router;
