import prisma from "../../lib/prisma";

const getUserById = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      tenantId: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export default {
  getUserById,
};