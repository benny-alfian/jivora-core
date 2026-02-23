"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockService = void 0;
const prisma_1 = require("../lib/prisma");
class StockService {
    static async recordMovement(data) {
        return prisma_1.prisma.stockMovement.create({
            data,
        });
    }
}
exports.StockService = StockService;
