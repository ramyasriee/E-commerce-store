import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { ProductModel } from "../models/product.js";
import { UserModel } from "../models/user.js";
import { initialProducts } from "./mockData.js";
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ecommerce";
export let isMongoConnected = false;
export async function connectMongo() {
    try {
        console.log(`Connecting to MongoDB at ${MONGODB_URI}...`);
        // 3 second connection timeout to prevent cloud hanging
        await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 3000 });
        isMongoConnected = true;
        console.log("Successfully connected to MongoDB!");
        await seedDatabaseIfNeeded();
        return true;
    }
    catch (err) {
        isMongoConnected = false;
        console.warn("MongoDB connection failed or unavailable. Falling back to In-Memory mode.");
        return false;
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
            const passwordHash = await bcrypt.hash("yakshith", 10);
            await UserModel.create({
                id: 1,
                email: "yakshith@admin.com",
                password_hash: passwordHash,
                name: "Yakshith Admin",
                role: "admin",
                created_at: new Date()
            });
        }
    }
    catch (err) {
        console.error("Error seeding MongoDB:", err);
    }
}
