import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import usersRoutes from "./modules/users/users.routes";
import productsRoutes from "./modules/products/products.routes";

const app = express();

app.use(cors());
app.use(express.json());

// Public
app.use("/api/auth", authRoutes);

// Modules
app.use("/api/users", usersRoutes);
app.use("/api/products", productsRoutes);

export default app;