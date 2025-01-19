const mock_chat_data = require("../../mockdata/chat");

exports.findAll = (req, res) => {
  return res.send(mock_chat_data);
};

exports.findOne = (req, res) => {
  const chat_id = req.params.chat_id;
  const chat = mock_chat_data.find((chat) => chat._id === chat_id);

  if (!chat) {
    return res
      .status(404)
      .send({ message: `Chat with id ${chat_id} not found` });
  }

  return res.send(chat);
};
