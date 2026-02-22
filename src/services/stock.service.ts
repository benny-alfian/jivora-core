import { prisma } from "../lib/prisma";
import { MovementType } from "@prisma/client";

export class StockService {
  static async recordMovement(data: {
    productId: string;
    userId: string;
    quantity: number;
    type: MovementType;
  }) {
    return prisma.stockMovement.create({
      data,
    });
  }
}