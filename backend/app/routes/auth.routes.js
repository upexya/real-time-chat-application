const express = require("express");
const router = express.Router();

const { auth_routes } = require("../constants/routes");
const auth_controller = require("../controller/auth.controller");

router.route(auth_routes.REGISTER).post((req,res)=>auth_controller.registerUser(req,res));

module.exports = router;
