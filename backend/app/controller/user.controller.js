const User = require("../models/user.model");

exports.search = async (req, res) => {
  const user_id = req.query.id;
  const search_query = req.query.q;

  let users = [];
  if (user_id) {
    users = await User.findOne({ _id: user_id }).select("-password");
  } else if (search_query) {
    users = await User.find({
      $or: [
        { name: { $regex: search_query, $options: "i" } },
        { email: { $regex: search_query, $options: "i" } },
      ],
    })
      .find({ _id: { $ne: req.user._id } }) // exclude current user
      .select("-password"); //exclude password;
  }

  return res.status(200).json(users);
};
