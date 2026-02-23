"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const transaction_service_1 = require("../services/transaction.service");
class TransactionController {
    /**
     * Create new transaction
     * POST /transactions
     */
    static async create(req, res, next) {
        try {
            const { userId, items } = req.body;
            if (!userId || !items || !Array.isArray(items) || items.length === 0) {
                return res.status(400).json({
                    message: "Invalid request body. userId and items are required.",
                });
            }
            const transaction = await transaction_service_1.TransactionService.create({
                userId,
                items,
            });
            return res.status(201).json({
                message: "Transaction created successfully",
                data: transaction,
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Get all transactions
     * GET /transactions
     */
    static async getAll(req, res, next) {
        try {
            const transactions = await transaction_service_1.TransactionService.getAll();
            return res.status(200).json({
                data: transactions,
            });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Get transaction by ID
     * GET /transactions/:id
     */
    static async getById(req, res, next) {
        try {
            const { id } = req.params;
            const transaction = await transaction_service_1.TransactionService.getById(id);
            if (!transaction) {
                return res.status(404).json({
                    message: "Transaction not found",
                });
            }
            return res.status(200).json({
                data: transaction,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.TransactionController = TransactionController;
