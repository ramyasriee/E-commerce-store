import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, default: "user" },
    created_at: { type: Date, default: Date.now }
});
export const UserModel = mongoose.model("User", UserSchema);
