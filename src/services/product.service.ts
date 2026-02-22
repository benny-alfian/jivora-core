import { prisma } from "../lib/prisma";

export class ProductService {
  static async create(data: {
    name: string;
    price: number;
    stock: number;
  }) {
    return prisma.product.create({
      data,
    });
  }

  static async findAll() {
    return prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  static async findById(id: string) {
    return prisma.product.findUnique({
      where: { id },
    });
  }

  static async updateStock(id: string, quantity: number) {
    return prisma.product.update({
      where: { id },
      data: {
        stock: {
          increment: quantity,
        },
      },
    });
  }
}