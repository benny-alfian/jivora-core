import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// =========================
// GLOBAL MIDDLEWARE
// =========================
app.use(cors());
app.use(express.json());

// =========================
// HEALTH CHECK
// =========================
app.get("/", (_req, res) => {
  res.json({
    message: "🚀 Jivora Core API is running",
    version: "1.0.0",
  });
});

// =========================
// ROUTES
// =========================
app.use("/api/auth", authRoutes);

// =========================
// GLOBAL ERROR HANDLER (Optional but recommended)
// =========================
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("❌ Global Error:", err);

  res.status(500).json({
    message: "Internal Server Error",
  });
});

// =========================
// START SERVER
// =========================
app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});