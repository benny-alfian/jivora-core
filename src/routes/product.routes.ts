import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import {
  authMiddleware,
  authorizeRoles,
} from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.post(
  "/",
  authorizeRoles("OWNER", "STAFF"),
  ProductController.create
);

router.get("/", ProductController.findAll);

router.put(
  "/:id",
  authorizeRoles("OWNER", "STAFF"),
  ProductController.update
);

router.delete(
  "/:id",
  authorizeRoles("OWNER"),
  ProductController.delete
);

export default router;