import { prisma } from "../../lib/prisma";

export const createProduct = async (data: {
  name: string;
  price: number;
  stock?: number;
  tenantId: string;
}) => {
  return prisma.product.create({
    data: {
      name: data.name,
      price: data.price,
      stock: data.stock ?? 0,
      tenantId: data.tenantId,
    },
  });
};

export const getProductsByTenant = async (tenantId: string) => {
  return prisma.product.findMany({
    where: { tenantId },
    orderBy: { createdAt: "desc" },
  });
};