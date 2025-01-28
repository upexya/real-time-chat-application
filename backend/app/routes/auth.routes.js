const express = require("express");
const router = express.Router();

const { auth_routes } = require("../constants/routes");
const {registerUser, loginUser} = require("../controller/auth.controller");

router.route(auth_routes.REGISTER).post(registerUser);

router.route(auth_routes.LOGIN).post(loginUser);

module.exports = router;
