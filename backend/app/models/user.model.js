const mongoose = require("mongoose");
const { hashPassword, verifyPassword } = require("../utils/passwordHash");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: {
        validator: (v) => {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar.png",
    },
  },
  {
    timestamp: true,
  }
);

userSchema.methods.verifyPassword = async function (_password) {
  return await verifyPassword(_password, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const hashed_password = await hashPassword(this.password);
  this.password = hashed_password;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
