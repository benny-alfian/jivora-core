"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    // ===============================
    // REGISTER (Create Tenant + Owner)
    // ===============================
    static async register(data) {
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
        const result = await prisma_1.default.$transaction(async (tx) => {
            const tenant = await tx.tenant.create({
                data: {
                    name: data.tenantName,
                    plan: "BASIC",
                    status: "ACTIVE",
                },
            });
            const user = await tx.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: hashedPassword,
                    role: "OWNER",
                    tenantId: tenant.id,
                },
            });
            return { tenant, user };
        });
        return result;
    }
    // ===============================
    // LOGIN
    // ===============================
    static async login(data) {
        const user = await prisma_1.default.user.findFirst({
            where: {
                email: data.email,
            },
        });
        if (!user) {
            throw new Error("User not found");
        }
        const isPasswordValid = await bcryptjs_1.default.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
            tenantId: user.tenantId,
            role: user.role,
        }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        };
    }
}
exports.AuthService = AuthService;
