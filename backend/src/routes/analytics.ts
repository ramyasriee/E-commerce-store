import { Router } from "express";
import { OrderModel } from "../models/Order.js";
import { ProductModel } from "../models/Product.js";
import { requireAdmin } from "../middleware/auth.js";

export const analyticsRouter = Router();

// Sales and revenue for charting (past 30 days)
analyticsRouter.get("/sales", requireAdmin, async (req, res) => {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const sales = await OrderModel.aggregate([
      { $match: { created_at: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } },
          revenue: { $sum: "$total_amount" },
          orders: { $sum: 1 }
        }
      },
      { $project: { day: "$_id", revenue: 1, orders: 1, _id: 0 } },
      { $sort: { day: 1 } }
    ]);
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sales analytics" });
  }
});

// Best selling products (top 5)
analyticsRouter.get("/top-products", requireAdmin, async (req, res) => {
  try {
    const top = await OrderModel.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.productId",
          sold: { $sum: "$products.quantity" }
        }
      },
      { $sort: { sold: -1 } },
      { $limit: 5 }
    ]);

    const result = [];
    for (const item of top) {
      const prod = await ProductModel.findOne({ id: item._id }).lean();
      if (prod) {
        result.push({ id: prod.id, name: prod.name, sold: item.sold });
      }
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch top products analytics" });
  }
});