"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const transaction_routes_1 = __importDefault(require("./routes/transaction.routes"));
const report_routes_1 = __importDefault(require("./routes/report.routes"));
const app = (0, express_1.default)();
/**
 * Middlewares
 */
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
/**
 * Health Check
 */
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});
/**
 * Routes
 */
app.use("/auth", auth_routes_1.default);
app.use("/products", product_routes_1.default);
app.use("/transactions", transaction_routes_1.default);
app.use("/reports", report_routes_1.default);
/**
 * 404 Handler
 */
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found",
    });
});
/**
 * Global Error Handler
 */
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        message: err.message || "Internal Server Error",
    });
});
exports.default = app;
