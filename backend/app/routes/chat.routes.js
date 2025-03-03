const express = require("express");
const router = express.Router();

const { chat_routes } = require("../constants/routes");
const chat_controller = require("../controller/chat.controller");

router
  .route(chat_routes.CHAT)
  .get(chat_controller.getAllChats)
  .post(chat_controller.createChat);

router.put(chat_routes.RENAME_GROUP, chat_controller.renameGroup);

router.put(chat_routes.ADD_GROUP_MEMBER, chat_controller.addGroupMembers);

router.put(chat_routes.REMOVE_GROUP_MEMBER, chat_controller.removeGroupMember);

module.exports = router;
