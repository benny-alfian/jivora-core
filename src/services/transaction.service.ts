import { prisma } from "../lib/prisma";
import { MovementType } from "@prisma/client";

export class TransactionService {
  static async createTransaction(data: {
    userId: string;
    items: {
      productId: string;
      quantity: numb4er;
      price: number;
    }[];
  }) {
    return prisma.$transaction(async (tx) => {
      let total = 0;

      for (const item of data.items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });

        if (!product) {
          throw new Error("Product not found");
        }

        if (product.stock < item.quantity) {
          throw new Error("Insufficient stock");
        }

        total += item.quantity * item.price;

        // Reduce stock
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });

        // Record stock movement
        await tx.stockMovement.create({
          data: {
            productId: item.productId,
            userId: data.userId,
            quantity: item.quantity,
            type: MovementType.OUT,
          },
        });
      }

      // Create transaction
      const transaction = await tx.transaction.create({
        data: {
          userId: data.userId,
          total,
          items: {
            create: data.items,
          },
        },
        include: {
          items: true,
        },
      });

      return transaction;
    });
  }
}