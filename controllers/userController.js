const User = require("../models/user");

// Display detail page for a specific User.
exports.user_detail = async (req, res) => {
  console.log(req.params.word);
  const user = await User.findById(req.params.id).populate("friends");

  // console.log(user);
  return res.send(user);
};

exports.user_search = async (req, res) => {
  const user = await User.find({
    $or: [
      { firstName: { $regex: req.params.word, $options: "i" } },
      { lastName: { $regex: req.params.word, $options: "i" } },
    ],
  });

  // console.log(user);
  return res.send(user);
};
