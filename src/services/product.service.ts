import { prisma } from "../lib/prisma";

export class ProductService {
  static async create(data: {
    name: string;
    price: number;
    stock?: number;
  }) {
    return prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        stock: data.stock ?? 0,
      },
    });
  }

  static async findAll() {
    return prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  static async update(
    id: string,
    data: { name?: string; price?: number; stock?: number }
  ) {
    return prisma.product.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return prisma.product.delete({
      where: { id },
    });
  }
}