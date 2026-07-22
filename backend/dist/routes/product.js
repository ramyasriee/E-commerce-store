import { Router } from "express";
import { ProductModel } from "../models/product.js";
import { isMongoConnected } from "../utils/db.js";
import { inMemoryDb } from "../utils/mockData.js";
import { z } from "zod";
import { requireAdmin } from "../middleware/auth.js";
export const productRouter = Router();
const productSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.number().positive(),
    image: z.string().url().optional(),
    images: z.array(z.string().url()).optional(),
    stock: z.number().int().nonnegative()
});
productRouter.get("/", async (_, res) => {
    try {
        if (isMongoConnected) {
            const products = await ProductModel.find().lean();
            return res.json(products);
        }
        const result = await inMemoryDb.query("FROM products");
        res.json(result.rows);
    }
    catch (err) {
        const result = await inMemoryDb.query("FROM products");
        res.json(result.rows);
    }
});
productRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (isMongoConnected) {
            const product = await ProductModel.findOne({ id: Number(id) }).lean();
            if (product)
                return res.json(product);
        }
        const result = await inMemoryDb.query("FROM products WHERE id =", [id]);
        if (result.rows.length === 0)
            return res.status(404).json({ error: "Not found" });
        res.json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch product" });
    }
});
productRouter.post("/", requireAdmin, async (req, res) => {
    const parse = productSchema.safeParse(req.body);
    if (!parse.success)
        return res.status(400).json(parse.error);
    try {
        const { name, description, price, image, images, stock } = parse.data;
        const imagesArr = images && images.length > 0 ? images : image ? [image] : [];
        if (isMongoConnected) {
            const maxProd = await ProductModel.findOne().sort({ id: -1 }).lean();
            const nextId = (maxProd?.id || 0) + 1;
            const newProduct = await ProductModel.create({
                id: nextId,
                name,
                description,
                price,
                image: image || "",
                images: imagesArr,
                stock
            });
            return res.json(newProduct);
        }
        const result = await inMemoryDb.query("INSERT INTO products", [name, description, price, image, imagesArr, stock]);
        res.json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to create product" });
    }
});
productRouter.put("/:id", requireAdmin, async (req, res) => {
    const { id } = req.params;
    const parse = productSchema.safeParse(req.body);
    if (!parse.success)
        return res.status(400).json(parse.error);
    try {
        const { name, description, price, image, images, stock } = parse.data;
        const imagesArr = images && images.length > 0 ? images : image ? [image] : [];
        if (isMongoConnected) {
            const updated = await ProductModel.findOneAndUpdate({ id: Number(id) }, { name, description, price, image: image || "", images: imagesArr, stock }, { new: true }).lean();
            if (updated)
                return res.json(updated);
        }
        const result = await inMemoryDb.query("UPDATE products", [name, description, price, image, imagesArr, stock, id]);
        res.json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to update product" });
    }
});
