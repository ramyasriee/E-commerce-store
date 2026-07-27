import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { ProductModel } from "../models/product.js";
import { UserModel } from "../models/user.js";
import { initialProducts } from "./mockData.js";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ecommerce";

export async function connectMongo(): Promise<void> {
  try {
    console.log(`Connecting to MongoDB at ${MONGODB_URI}...`);
    await mongoose.connect(MONGODB_URI);
    console.log("Successfully connected to MongoDB!");
    await seedDatabaseIfNeeded();
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  }
}

async function seedDatabaseIfNeeded() {
  try {
    const productCount = await ProductModel.countDocuments();
    if (productCount === 0) {
      console.log("Seeding 50 initial products into MongoDB...");
      await ProductModel.insertMany(initialProducts);
    }

    const userCount = await UserModel.countDocuments();
    if (userCount === 0) {
      const passwordHash = await bcrypt.hash("admin123", 10);
      await UserModel.create({
        id: 1,
        email: "admin@shophub.local",
        password_hash: passwordHash,
        name: "Platform Admin",
        role: "admin",
        created_at: new Date()
      });
    }
  } catch (err) {
    console.error("Error seeding MongoDB:", err);
  }
}