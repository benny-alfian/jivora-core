import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();

/**
 * Auth Routes
 */

// Register Tenant + Owner
router.post("/register", AuthController.register);

// Login User
router.post("/login", AuthController.login);

export default router;