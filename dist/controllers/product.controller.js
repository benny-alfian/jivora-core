"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("../services/product.service");
class ProductController {
    static async create(req, res) {
        const product = await product_service_1.ProductService.create(req.body);
        res.status(201).json(product);
    }
    static async findAll(_req, res) {
        const products = await product_service_1.ProductService.findAll();
        res.json(products);
    }
    static async update(req, res) {
        const product = await product_service_1.ProductService.update(req.params.id, req.body);
        res.json(product);
    }
    static async delete(req, res) {
        await product_service_1.ProductService.delete(req.params.id);
        res.json({ message: "Product deleted" });
    }
}
exports.ProductController = ProductController;
