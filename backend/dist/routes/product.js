import { Router } from "express";
import { ProductModel } from "../models/product.js";
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
        const products = await ProductModel.find().lean();
        return res.json(products);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
});
productRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findOne({ id: Number(id) }).lean();
        if (product)
            return res.json(product);
        return res.status(404).json({ error: "Not found" });
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
        const updated = await ProductModel.findOneAndUpdate({ id: Number(id) }, { name, description, price, image: image || "", images: imagesArr, stock }, { new: true }).lean();
        if (updated)
            return res.json(updated);
        return res.status(404).json({ error: "Product not found" });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to update product" });
    }
});
