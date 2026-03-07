import { Request, Response } from "express";
import * as productService from "./products.service";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req.body);

    res.status(201).json({
      message: "Product created",
      data: product,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
};

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await productService.getProducts();

    res.json({
      data: products,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ data: product });
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.updateProduct(
      req.params.id,
      req.body
    );

    res.json({
      message: "Product updated",
      data: product,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await productService.deleteProduct(req.params.id);

    res.json({
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};