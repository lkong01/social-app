const User = require("../models/user");

// get all friends of a user
exports.friends_list = async (req, res) => {
  const friends = await User.findById(req.params.id)
    .sort({ username: "desc" })
    .populate("friends");

  // console.log(friends);
  return res.send(friends);
};
