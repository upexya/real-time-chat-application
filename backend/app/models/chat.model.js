const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
  {
    chat_name: {
      type: String,
      trim: true,
    },
    is_group_chat: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latest_message: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    group_admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const chat = mongoose.model("Chat", chatModel);

module.exports = chat;
