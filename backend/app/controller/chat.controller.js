const Chat = require("../models/chat.model");
const User = require("../models/user.model");

exports.getAllChats = async (req, res) => {
  const user_id = req?.user?._id?.toString();

  if (!user_id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    let user_chats = await Chat.find({
      users: user_id,
    })
      .populate("users", "-password")
      .populate("latest_message")
      .populate("group_admin", "name email")
      .sort({ updatedAt: -1 });

    user_chats = await User.populate(user_chats, {
      path: "latest_message.sender",
      select: "name avatar",
    });

    if (!user_chats) {
      return res.status(200).json([]);
    }

    res.status(200).json(user_chats);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.createChat = async (req, res) => {
  const { chat_name, is_group_chat, users, group_admin } = req.body;

  if (!chat_name) {
    return res.status(400).json({ message: "Chat name is required" });
  }

  if (!users?.length) {
    return res.status(400).json({ message: "Users are required" });
  }

  // check if chat with same participants already exists
  const existing_chat = await Chat.findOne({ users })
    .populate("users", "-password")
    .populate("group_admin", "name email")
    .populate("latest_message")
    .lean();

  if (existing_chat && !is_group_chat) {
    return res.status(200).json({ ...existing_chat, is_existing_chat: true });
  }

  if (is_group_chat && !group_admin) {
    return res.status(400).json({ message: "Group admin is required" });
  }

  const chat = new Chat({
    chat_name,
    is_group_chat,
    users,
    group_admin,
  });

  await chat.save();

  res.status(201).json(chat);
};

exports.renameGroup = async (req, res) => {
  const { chat_id } = req?.query;
  const new_chat_name = req?.body?.chat_name;

  if (!chat_id || !new_chat_name) {
    return res.status(400).json({ message: "Chat ID and Chat name required" });
  }

  try {
    const updated_chat = await Chat.findByIdAndUpdate(
      chat_id,
      { chat_name: new_chat_name },
      { new: true }
    )
      .populate("users", "-password")
      .populate("group_admin", "name email")
      .populate("latest_message");

    return res.status(200).json(updated_chat);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.addGroupMembers = async (req, res) => {
  const { chat_id } = req?.query;
  const new_member = req?.body?.user_id;

  if (!chat_id || !new_member) {
    return res
      .status(400)
      .json({ message: "Chat ID and New User ID required" });
  }

  try {
    const chat = await Chat.findById(chat_id);

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    if (!chat.is_group_chat) {
      return res.status(400).json({ message: "Chat is not a group chat" });
    }

    if (chat.users.includes(new_member)) {
      return res.status(400).json({ message: "User is already a member" });
    }

    chat.users.push(new_member);

    await chat.save();

    const updated_chat = await Chat.findById(chat_id)
      .populate("users", "-password")
      .populate("group_admin", "name email")
      .populate("latest_message");

    return res.status(200).json(updated_chat);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", err });
  }
};

exports.removeGroupMember = async (req, res) => {
  const { chat_id } = req?.query;
  const member_id = req?.body?.user_id;

  if (!chat_id || !member_id) {
    return res.status(400).json({ message: "Chat ID and Member ID required" });
  }

  try {
    const chat = await Chat.findById(chat_id);

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    if (!chat.is_group_chat) {
      return res.status(400).json({ message: "Chat is not a group chat" });
    }

    if (!chat.users.includes(member_id)) {
      return res.status(400).json({ message: "User is not a member" });
    }

    const new_users = chat.users.filter(
      (user) => user.toString() !== member_id
    );
    chat.users = new_users;
    await chat.save();

    const updated_chat = await Chat.findById(chat_id)
      .populate("users", "-password")
      .populate("group_admin", "name email")
      .populate("latest_message");

    return res.status(200).json(updated_chat);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
