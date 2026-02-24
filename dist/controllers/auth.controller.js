"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
class AuthController {
    static async register(req, res) {
        try {
            const { tenantName, name, email, password } = req.body;
            if (!tenantName || !name || !email || !password) {
                return res.status(400).json({
                    message: "All fields are required",
                });
            }
            const result = await auth_service_1.AuthService.register({
                tenantName,
                name,
                email,
                password,
            });
            return res.status(201).json({
                message: "Tenant registered successfully",
                data: result,
            });
        }
        catch (error) {
            console.error("Register Error:", error);
            return res.status(500).json({
                message: error.message || "Internal Server Error",
            });
        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    message: "Email and password are required",
                });
            }
            const result = await auth_service_1.AuthService.login({
                email,
                password,
            });
            return res.status(200).json({
                message: "Login successful",
                data: result,
            });
        }
        catch (error) {
            return res.status(401).json({
                message: error.message || "Invalid credentials",
            });
        }
    }
}
exports.AuthController = AuthController;
