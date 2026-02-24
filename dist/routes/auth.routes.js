"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
/**
 * Auth Routes
 */
// Register Tenant + Owner
router.post("/register", auth_controller_1.AuthController.register);
// Login User
router.post("/login", auth_controller_1.AuthController.login);
exports.default = router;
