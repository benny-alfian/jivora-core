import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import transactionRoutes from "./routes/transaction.routes";
import reportRoutes from "./routes/report.routes";

dotenv.config();

const app = express();

// ✅ WAJIB parse ke number
const PORT = Number(process.env.PORT) || 8080;

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (_req, res) => {
  res.json({
    message: "🚀 Jivora Core API is running",
    version: "1.0.0",
    status: "OK",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/reports", reportRoutes);

// 404
app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error
app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error("❌ Global Error:", err);
    res.status(err.status || 500).json({
      message: err.message || "Internal Server Error",
    });
  },
);

// ✅ Railway compatible listen
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
