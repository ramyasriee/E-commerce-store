import mongoose, { Schema } from "mongoose";
const ProductSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, default: "" },
    images: { type: [String], default: [] },
    stock: { type: Number, required: true, default: 0 }
});
export const ProductModel = mongoose.model("Product", ProductSchema);
