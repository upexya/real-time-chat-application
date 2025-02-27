const User = require("../models/user.model");
const generateToken = require("../utils/generateJwtToken");

exports.registerUser = async (req, res) => {
  const { name, email, password, avatar } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  const user_exists = await User.findOne({ email });
  if (user_exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
    avatar,
  });
  if (user) {
    const token = generateToken(user._id);
    const { password, __v, _id, ...rest } = user._doc;

    return res.status(201).json({ ...rest, id: _id, token });
  } else {
    return res.status(400).json({ message: "Invalid user data" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }

  const is_password_valid = await user.verifyPassword(password);
  if (!is_password_valid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user._id);
  const { password: _, __v, _id, ...rest } = user._doc;

  return res.status(200).json({ ...rest, id: _id, token });
};
