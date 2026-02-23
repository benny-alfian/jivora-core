"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../lib/prisma");
class AuthController {
    /**
     * =========================
     * REGISTER
     * =========================
     */
    static async register(req, res) {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(400).json({
                    message: "Name, email, and password are required",
                });
            }
            // Check if user already exists
            const existingUser = await prisma_1.prisma.user.findUnique({
                where: { email },
            });
            if (existingUser) {
                return res.status(400).json({
                    message: "Email already registered",
                });
            }
            // Hash password
            const hashedPassword = await bcryptjs_1.default.hash(password, 10);
            // Create user
            const user = await prisma_1.prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });
            return res.status(201).json({
                message: "User registered successfully",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            });
        }
        catch (error) {
            console.error("Register Error:", error);
            return res.status(500).json({
                message: error.message || "Internal Server Error",
            });
        }
    }
    /**
     * =========================
     * LOGIN
     * =========================
     */
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    message: "Email and password are required",
                });
            }
            // Find user
            const user = await prisma_1.prisma.user.findUnique({
                where: { email },
            });
            if (!user) {
                return res.status(401).json({
                    message: "Invalid email or password",
                });
            }
            // Compare password
            const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    message: "Invalid email or password",
                });
            }
            // Generate JWT
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
            return res.status(200).json({
                message: "Login successful",
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            });
        }
        catch (error) {
            console.error("Login Error:", error);
            return res.status(500).json({
                message: error.message || "Internal Server Error",
            });
        }
    }
}
exports.AuthController = AuthController;
