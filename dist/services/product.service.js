"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const prisma_1 = require("../lib/prisma");
class ProductService {
    static async create(data) {
        return prisma_1.prisma.product.create({
            data: {
                name: data.name,
                price: data.price,
                stock: data.stock ?? 0,
            },
        });
    }
    static async findAll() {
        return prisma_1.prisma.product.findMany({
            orderBy: { createdAt: "desc" },
        });
    }
    static async update(id, data) {
        return prisma_1.prisma.product.update({
            where: { id },
            data,
        });
    }
    static async delete(id) {
        return prisma_1.prisma.product.delete({
            where: { id },
        });
    }
}
exports.ProductService = ProductService;
