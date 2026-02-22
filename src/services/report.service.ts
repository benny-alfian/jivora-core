import { prisma } from "../lib/prisma";

export class ReportService {
  static async dailySummary() {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const transactions = await prisma.transaction.findMany({
      where: {
        createdAt: {
          gte: startOfDay,
        },
      },
    });

    const totalRevenue = transactions.reduce(
      (sum, t) => sum + t.total,
      0
    );

    return {
      totalTransactions: transactions.length,
      totalRevenue,
    };
  }

  static async lowStock(threshold: number = 5) {
    return prisma.product.findMany({
      where: {
        stock: {
          lte: threshold,
        },
      },
      orderBy: {
        stock: "asc",
      },
    });
  }
}