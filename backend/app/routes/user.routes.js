const express = require("express");
const router = express.Router();

const { user_routes } = require("../constants/routes");
const user_controller = require("../controller/user.controller");

router.get(user_routes.USER, user_controller.search);

module.exports = router;
