import { prisma } from "../lib/prisma";
import { MovementType } from "@prisma/client";

interface TransactionInput {
  userId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
}

export class TransactionService {
  static async create(data: TransactionInput) {
    return prisma.$transaction(async (tx) => {
      let total = 0;

      const transaction = await tx.transaction.create({
        data: {
          userId: data.userId,
          total: 0,
        },
      });

      for (const item of data.items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });

        if (!product) {
          throw new Error("Product not found");
        }

        if (product.stock < item.quantity) {
          throw new Error(`Stock not enough for ${product.name}`);
        }

        const subtotal = product.price * item.quantity;
        total += subtotal;

        await tx.transactionItem.create({
          data: {
            transactionId: transaction.id,
            productId: product.id,
            quantity: item.quantity,
            price: product.price,
            subtotal,
          },
        });

        await tx.product.update({
          where: { id: product.id },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });

        await tx.stockMovement.create({
          data: {
            productId: product.id,
            userId: data.userId,
            type: MovementType.OUT,
            quantity: item.quantity,
            note: `Transaction ${transaction.id}`,
          },
        });
      }

      await tx.transaction.update({
        where: { id: transaction.id },
        data: { total },
      });

      return transaction;
    });
  }
}