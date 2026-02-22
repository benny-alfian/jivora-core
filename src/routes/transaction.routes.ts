import { Router } from "express";
import { TransactionController } from "../controllers/transaction.controller";
import { authMiddleware, authorizeRoles } from "../middlewares/auth.middleware";

const router = Router();

/**
 * Semua route transaction harus login
 */
router.use(authMiddleware);

/**
 * Create Transaction
 * Role: OWNER, KASIR
 */
router.post(
  "/",
  authorizeRoles("OWNER", "KASIR"),
  TransactionController.create
);

/**
 * Get All Transactions
 * Role: OWNER, STAFF
 */
router.get(
  "/",
  authorizeRoles("OWNER", "STAFF"),
  TransactionController.getAll
);

/**
 * Get Transaction by ID
 * Role: OWNER, STAFF
 */
router.get(
  "/:id",
  authorizeRoles("OWNER", "STAFF"),
  TransactionController.getById
);

export default router;