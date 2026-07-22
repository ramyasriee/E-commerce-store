import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  role: string;
  created_at: Date;
}

const UserSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: "user" },
  created_at: { type: Date, default: Date.now }
});

export const UserModel = mongoose.model<IUser>("User", UserSchema);