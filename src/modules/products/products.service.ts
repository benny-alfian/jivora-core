import { prisma } from "../../lib/prisma";

export const createProduct = async (data: {
  name: string;
  price: number;
  stock: number;
}) => {
  return prisma.product.create({
    data,
  });
};

export const getProducts = async () => {
  return prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getProductById = async (id: string) => {
  return prisma.product.findUnique({
    where: { id },
  });
};

export const updateProduct = async (
  id: string,
  data: {
    name?: string;
    price?: number;
    stock?: number;
  }
) => {
  return prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProduct = async (id: string) => {
  return prisma.product.delete({
    where: { id },
  });
};