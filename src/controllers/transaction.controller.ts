import { Request, Response, NextFunction } from "express";
import { TransactionService } from "../services/transaction.service";

export class TransactionController {
  /**
   * Create new transaction
   * POST /transactions
   */
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, items } = req.body;

      if (!userId || !items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
          message: "Invalid request body. userId and items are required.",
        });
      }

      const transaction = await TransactionService.create({
        userId,
        items,
      });

      return res.status(201).json({
        message: "Transaction created successfully",
        data: transaction,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all transactions
   * GET /transactions
   */
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const transactions = await TransactionService.getAll();

      return res.status(200).json({
        data: transactions,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get transaction by ID
   * GET /transactions/:id
   */
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const transaction = await TransactionService.getById(id);

      if (!transaction) {
        return res.status(404).json({
          message: "Transaction not found",
        });
      }

      return res.status(200).json({
        data: transaction,
      });
    } catch (error) {
      next(error);
    }
  }
}