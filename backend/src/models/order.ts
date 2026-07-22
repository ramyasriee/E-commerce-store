import mongoose, { Schema, Document } from "mongoose";

export interface IOrderItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  id: number;
  user_id: number;
  total_amount: number;
  status: string;
  products: IOrderItem[];
  created_at: Date;
}

const OrderSchema: Schema = new Schema({
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

export const OrderModel = mongoose.model<IOrder>("Order", OrderSchema);