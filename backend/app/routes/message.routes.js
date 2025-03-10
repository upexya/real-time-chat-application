const express = require("express");
const router = express.Router();

const { message_routes } = require("../constants/routes");
const message_controller = require("../controller/message.controller");

router.post(message_routes.MESSAGE, message_controller.sendMessage);

router.get(message_routes.GET_MESSAGES, message_controller.getMessages);

module.exports = router;
