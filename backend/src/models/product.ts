import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  images: string[];
  stock: number;
}

const ProductSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: "" },
  images: { type: [String], default: [] },
  stock: { type: Number, required: true, default: 0 }
});

export const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);