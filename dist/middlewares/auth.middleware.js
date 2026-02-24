"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * 🔐 Authenticate Middleware
 * - Verifies JWT
 * - Attaches decoded payload to req.user
 */
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Unauthorized - No token provided",
        });
    }
    const token = authHeader.split(" ")[1];
    if (!process.env.JWT_SECRET) {
        return res.status(500).json({
            message: "JWT secret not configured",
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch {
        return res.status(401).json({
            message: "Unauthorized - Invalid or expired token",
        });
    }
};
exports.authenticate = authenticate;
/**
 * 👑 Authorize Middleware
 * - Restricts access by role
 */
const authorize = (...allowedRoles) => (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
    if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
            message: "Forbidden - Access denied",
        });
    }
    next();
};
exports.authorize = authorize;
