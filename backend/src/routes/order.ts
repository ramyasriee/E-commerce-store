import { Router } from "express";
import { OrderModel } from "../models/order.js";
import { ProductModel } from "../models/product.js";
import { requireUser } from "../middleware/auth.js";
import { z } from "zod";

export const orderRouter = Router();

orderRouter.get("/", requireUser, async (req, res) => {
  try {
    const orders = await OrderModel.find({ user_id: req.session.userId }).sort({ created_at: -1 }).lean();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

const orderSchema = z.object({
  products: z.array(z.object({
    productId: z.number(),
    quantity: z.number().int().positive()
  }))
});

orderRouter.post("/", requireUser, async (req, res) => {
  const parse = orderSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json(parse.error);

  const { products } = parse.data;

  try {
    let total = 0;
    const orderItems = [];

    for (const item of products) {
      const prod = await ProductModel.findOne({ id: item.productId }).lean();
      if (!prod) {
        return res.status(400).json({ error: `Invalid product ID: ${item.productId}` });
      }
      const price = Number(prod.price);
      total += price * item.quantity;
      orderItems.push({ productId: item.productId, quantity: item.quantity, price });
    }

    const maxOrder = await OrderModel.findOne().sort({ id: -1 }).lean();
    const nextId = (maxOrder?.id || 0) + 1;

    const newOrder = await OrderModel.create({
      id: nextId,
      user_id: req.session.userId,
      total_amount: total,
      status: "pending",
      products: orderItems,
      created_at: new Date()
    });

    res.json(newOrder);
  } catch (e) {
    res.status(500).json({ error: "Failed to create order" });
  }
});