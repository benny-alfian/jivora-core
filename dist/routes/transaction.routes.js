"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_controller_1 = require("../controllers/transaction.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
/**
 * Semua route transaction harus login
 */
router.use(auth_middleware_1.authMiddleware);
/**
 * Create Transaction
 * Role: OWNER, KASIR
 */
router.post("/", (0, auth_middleware_1.authorizeRoles)("OWNER", "KASIR"), transaction_controller_1.TransactionController.create);
/**
 * Get All Transactions
 * Role: OWNER, STAFF
 */
router.get("/", (0, auth_middleware_1.authorizeRoles)("OWNER", "STAFF"), transaction_controller_1.TransactionController.getAll);
/**
 * Get Transaction by ID
 * Role: OWNER, STAFF
 */
router.get("/:id", (0, auth_middleware_1.authorizeRoles)("OWNER", "STAFF"), transaction_controller_1.TransactionController.getById);
exports.default = router;
