const express = require("express");
const router = express.Router();

const { chat_routes } = require("../constants/routes");
const chat_controller = require("../controller/chat.controller");

// Retrieve all chat
router.get(chat_routes.GET_ALL_CHAT, chat_controller.findAll);

// Using router.route we can chain various methods to a single route.
router.route(chat_routes.GET_SINGLE_CHAT).get(chat_controller.findOne);

module.exports = router;
