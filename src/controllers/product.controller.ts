import { Request, Response } from "express";
import { ProductService } from "../services/product.service";

export class ProductController {
  static async create(req: Request, res: Response) {
    const product = await ProductService.create(req.body);
    res.status(201).json(product);
  }

  static async findAll(_req: Request, res: Response) {
    const products = await ProductService.findAll();
    res.json(products);
  }

  static async update(req: Request, res: Response) {
    const product = await ProductService.update(
      req.params.id,
      req.body
    );
    res.json(product);
  }

  static async delete(req: Request, res: Response) {
    await ProductService.delete(req.params.id);
    res.json({ message: "Product deleted" });
  }
}