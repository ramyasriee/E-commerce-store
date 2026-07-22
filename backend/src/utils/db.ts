import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { ProductModel } from "../models/Product.js";
import { UserModel } from "../models/User.js";
import { initialProducts } from "./mockData.js";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ecommerce";

export async function connectMongo(): Promise<typeof mongoose> {
  console.log(`Connecting to MongoDB at ${MONGODB_URI}...`);
  const conn = await mongoose.connect(MONGODB_URI);
  console.log("Successfully connected to MongoDB!");

  await seedDatabaseIfNeeded();
  return conn;
}

async function seedDatabaseIfNeeded() {
  try {
    const productCount = await ProductModel.countDocuments();
    if (productCount === 0) {
      console.log("Seeding 50 initial products into MongoDB...");
      await ProductModel.insertMany(initialProducts);
      console.log("Successfully seeded 50 products!");
    }

    const userCount = await UserModel.countDocuments();
    if (userCount === 0) {
      console.log("Seeding default admin user into MongoDB...");
      const passwordHash = await bcrypt.hash("yakshith", 10);
      await UserModel.create({
        id: 1,
        email: "yakshith@admin.com",
        password_hash: passwordHash,
        name: "Yakshith Admin",
        role: "admin",
        created_at: new Date()
      });
      console.log("Successfully seeded default admin user!");
    }
  } catch (err) {
    console.error("Error seeding MongoDB:", err);
  }
}

// Backward-compatible query wrapper if needed
export const pool = {
  async connect() {
    return {
      query: async () => ({ rows: [] }),
      release: () => {}
    };
  },
  async query() {
    return { rows: [] };
  }
};