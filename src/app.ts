import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";

const app = express();

/**
 * Middlewares
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Health Check
 */
app.get("/", (req, res) => {
  res.status(200).json({
    message: "🚀 Jivora Core API is running",
    version: "2.0.0",
    status: "OK",
  });
});

/**
 * Routes
 */
app.use("/api/auth", authRoutes);

/**
 * 404 Handler
 */
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

export default app;