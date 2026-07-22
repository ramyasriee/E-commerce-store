import { Router } from "express";
import { UserModel } from "../models/user.js";
import { OrderModel } from "../models/order.js";
import { requireAdmin } from "../middleware/auth.js";
export const adminRouter = Router();
// Get all users
adminRouter.get("/users", requireAdmin, async (_, res) => {
    try {
        const users = await UserModel.find({}, { password_hash: 0 }).sort({ created_at: -1 }).lean();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});
// Update user role
adminRouter.put("/user/:id", requireAdmin, async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    try {
        await UserModel.updateOne({ id: Number(id) }, { role });
        res.json({ success: true });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to update user role" });
    }
});
// Delete user
adminRouter.delete("/user/:id", requireAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        await UserModel.deleteOne({ id: Number(id) });
        res.json({ success: true });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to delete user" });
    }
});
// Get all orders
adminRouter.get("/orders", requireAdmin, async (_, res) => {
    try {
        const orders = await OrderModel.find().sort({ created_at: -1 }).lean();
        res.json(orders);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});
// Update order status
adminRouter.put("/order/:id", requireAdmin, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        await OrderModel.updateOne({ id: Number(id) }, { status });
        res.json({ success: true });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to update order status" });
    }
});
