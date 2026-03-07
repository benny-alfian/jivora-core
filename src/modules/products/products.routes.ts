import { Router } from "express";
import * as productController from "./products.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.post("/", productController.createProduct);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.patch("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export default router;