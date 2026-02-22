import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import transactionRoutes from "./routes/transaction.routes";
import reportRoutes from "./routes/report.routes";

const app = express();

/**
 * Middlewares
 */
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

/**
 * Health Check
 */
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

/**
 * Routes
 */
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/transactions", transactionRoutes);
app.use("/reports", reportRoutes);

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
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err);

    res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
);

export default app;