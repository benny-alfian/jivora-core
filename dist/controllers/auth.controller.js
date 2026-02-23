"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
class AuthController {
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await auth_service_1.AuthService.login(email, password);
            res.json(result);
        }
        catch (error) {
            res.status(401).json({
                message: error.message,
            });
        }
    }
}
exports.AuthController = AuthController;
