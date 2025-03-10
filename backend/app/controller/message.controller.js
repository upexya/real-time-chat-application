const Message = require("../models/message.model");
const Chat = require("../models/chat.model");

exports.sendMessage = async (req, res) => {
  const { content, chat_id } = req.body;
  if (!content || !chat_id) {
    return res
      .status(400)
      .json({ message: "Content and chat_id are required" });
  }

  try {
    const new_message = {
      sender: req.user._id,
      content: content,
      chat: chat_id,
    };

    let message = await Message.create(new_message);
    message = await message.populate("sender", "name avatar");

    await Chat.findByIdAndUpdate(chat_id, {
      latest_message: message._id,
    });

    return res.status(200).json(message);
  } catch (err) {
    return res.status(500).json(err?.message || "Internal server error");
  }
};

exports.getMessages = async (req, res) => {
  const limit = 15;
  const { chat_id } = req.params;
  if (!chat_id) {
    return res.status(400).json({ message: "Chat ID is required" });
  }

  let { page } = req.query;
  page = page ? parseInt(page) : 0;
  const from = page * limit;

  try {
    const [messages, count] = await Promise.all([
      Message.find({ chat: chat_id })
        .populate("sender", "_id")
        .limit(limit)
        .skip(parseInt(from))
        .sort({ createdAt: -1 }),

      Message.countDocuments({ chat: chat_id }), // Get the total count
    ]);

    return res.status(200).json({ messages, count, has_more: count > from + limit });
  } catch (err) {
    return res.status(500).json(err?.message || "Internal server error");
  }
};
