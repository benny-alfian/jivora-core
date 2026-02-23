"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const prisma_1 = require("../lib/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    static async login(email, password) {
        const user = await prisma_1.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const valid = await bcrypt_1.default.compare(password, user.password);
        if (!valid) {
            throw new Error("Invalid credentials");
        }
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
            role: user.role,
        }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }
}
exports.AuthService = AuthService;
