import { Router } from "express";
import * as productController from "./products.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

/**
 * Protected Routes
 * Base: /api/products
 */

router.post("/", authMiddleware, productController.create);
router.get("/", authMiddleware, productController.getAll);

export default router;