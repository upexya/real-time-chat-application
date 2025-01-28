const User = require("../models/user.model");
const generateToken = require("../utils/generateJwtToken");
const { hashPassword, verifyPassword } = require("../utils/passwordHash");

exports.registerUser = async (req, res) => {
  const { name, email, password, avatar } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send("Please provide all required fields");
  }

  const user_exists = await User.findOne({ email });
  if (user_exists) {
    return res.status(400).send("User already exists");
  }

  const hashed_password = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashed_password,
    avatar,
  });
  if (user) {
    const token = generateToken(user._id);
    const { password, __v, ...rest } = user._doc;

    return res.status(201).json({ ...rest, token });
  } else {
    return res.status(400).send("Invalid user data");
  }
};
