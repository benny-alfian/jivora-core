import { Router } from "express";
import { TransactionController } from "../controllers/transaction.controller";
import {
  authMiddleware,
  authorizeRoles,
} from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.post(
  "/",
  authorizeRoles("OWNER", "KASIR"),
  TransactionController.create
);

export default router;