import mongoose, { Schema } from "mongoose";
const OrderSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    user_id: { type: Number, required: true },
    total_amount: { type: Number, required: true },
    status: { type: String, default: "pending" },
    products: [
        {
            productId: { type: Number, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    created_at: { type: Date, default: Date.now }
});
export const OrderModel = mongoose.model("Order", OrderSchema);
