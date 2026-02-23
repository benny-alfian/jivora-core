"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const prisma_1 = require("../lib/prisma");
class ReportService {
    static async dailySummary() {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const transactions = await prisma_1.prisma.transaction.findMany({
            where: {
                createdAt: {
                    gte: startOfDay,
                },
            },
        });
        const totalRevenue = transactions.reduce((sum, t) => sum + t.total, 0);
        return {
            totalTransactions: transactions.length,
            totalRevenue,
        };
    }
    static async lowStock(threshold = 5) {
        return prisma_1.prisma.product.findMany({
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
exports.ReportService = ReportService;
