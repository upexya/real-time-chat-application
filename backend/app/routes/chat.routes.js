const routes = require("../constants/routes");
const chat_controller = require("../controller/chat.controller");

module.exports = (app) => {
  // Retrieve all chat
  app.get(routes.GET_ALL_CHAT, chat_controller.findAll);

  // Retrieve a single chat with chatid
  app.get(routes.GET_SINGLE_CHAT, chat_controller.findOne);
};
