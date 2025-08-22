const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validator = require("../utils/validator");

// Routes
router.post("/register", validator.validateRegister, userController.register);
router.post("/login", validator.validateLogin, userController.login);
router.get("/profile", userController.getProfile);

module.exports = router;
