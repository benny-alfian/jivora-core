import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface RegisterInput {
  tenantName: string;
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export class AuthService {
  // ===============================
  // REGISTER (Create Tenant + Owner)
  // ===============================
  static async register(data: RegisterInput) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const result = await prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const tenant = await tx.tenant.create({
          data: {
            name: data.tenantName,
            plan: "BASIC",
            status: "ACTIVE",
          },
        });

        const user = await tx.user.create({
          data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: "OWNER",
            tenantId: tenant.id,
          },
        });

        return { tenant, user };
      }
    );

    return result;
  }

  // ===============================
  // LOGIN
  // ===============================
  static async login(data: LoginInput) {
    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign(
      {
        userId: user.id,
        tenantId: user.tenantId,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }
}