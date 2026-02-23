"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const transaction_routes_1 = __importDefault(require("./routes/transaction.routes"));
const report_routes_1 = __importDefault(require("./routes/report.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// ===============================
// CONFIG PORT (Railway fixed 3000)
// ===============================
const PORT = 3000;
// ===============================
// MIDDLEWARE
// ===============================
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// ===============================
// HEALTH CHECK
// ===============================
app.get("/", (_req, res) => {
    res.json({
        message: "🚀 Jivora Core API is running",
        version: "1.0.0",
        status: "OK",
    });
});
// ===============================
// ROUTES
// ===============================
app.use("/api/auth", auth_routes_1.default);
app.use("/api/products", product_routes_1.default);
app.use("/api/transactions", transaction_routes_1.default);
app.use("/api/reports", report_routes_1.default);
// ===============================
// 404 HANDLER
// ===============================
app.use((_req, res) => {
    res.status(404).json({
        message: "Route not found",
    });
});
// ===============================
// GLOBAL ERROR HANDLER
// ===============================
app.use((err, _req, res, _next) => {
    console.error("❌ Global Error:", err);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
    });
});
// ===============================
// START SERVER
// ===============================
app.listen(PORT, () => {
    console.log(`🔥 Server running on port ${PORT}`);
});
