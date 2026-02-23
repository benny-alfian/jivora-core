import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();

/**
 * Auth Routes
 */
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

export default router;