import { Request, Response } from "express";
import * as productService from "./products.service";

export const create = async (req: Request, res: Response) => {
  try {
    const { name, price, stock } = req.body;
    const user = (req as any).user;

    const product = await productService.createProduct({
      name,
      price,
      stock,
      tenantId: user.tenantId,
    });

    return res.status(201).json({
      message: "Product created",
      data: product,
    });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const products = await productService.getProductsByTenant(user.tenantId);

    return res.json({
      message: "Products fetched",
      data: products,
    });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
