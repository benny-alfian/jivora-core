import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import transactionRoutes from "./routes/transaction.routes";
import reportRoutes from "./routes/report.routes";

const app = express();

/**
 * =========================
 * Middlewares
 * =========================
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * =========================
 * Health Check
 * =========================
 */
app.get("/", (_req, res) => {
  res.status(200).json({
    message: "🚀 Jivora Core API is running",
    version: "1.0.0",
    status: "OK",
  });
});

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

/**
 * =========================
 * Routes (API Prefix)
 * =========================
 */
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/reports", reportRoutes);

/**
 * =========================
 * 404 Handler
 * =========================
 */
app.use((_req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

/**
 * =========================
 * Global Error Handler
 * =========================
 */
app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error("❌ Global Error:", err);

    res.status(err.status || 500).json({
      message: err.message || "Internal Server Error",
    });
  }
);

export default app;