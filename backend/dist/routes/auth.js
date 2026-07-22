import { Router } from "express";
import { UserModel } from "../models/user.js";
import { z } from "zod";
import { hashPassword, verifyPassword } from "../utils/fake-auth.js";
export const authRouter = Router();
const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(1)
});
authRouter.post("/register", async (req, res) => {
    const parse = registerSchema.safeParse(req.body);
    if (!parse.success)
        return res.status(400).json(parse.error);
    const { email, password, name } = parse.data;
    try {
        const existing = await UserModel.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(400).json({ error: "User with this email already exists" });
        }
        const hashed = await hashPassword(password);
        const maxUser = await UserModel.findOne().sort({ id: -1 }).lean();
        const nextId = (maxUser?.id || 0) + 1;
        const newUser = await UserModel.create({
            id: nextId,
            email: email.toLowerCase(),
            password_hash: hashed,
            name,
            role: "user",
            created_at: new Date()
        });
        req.session.userId = newUser.id;
        req.session.isAdmin = newUser.role === "admin";
        res.json({ id: newUser.id, email: newUser.email, name: newUser.name, isAdmin: newUser.role === "admin" });
    }
    catch (e) {
        res.status(500).json({ error: "Registration failed" });
    }
});
authRouter.get("/me", async (req, res) => {
    if (!req.session.userId)
        return res.status(401).json({ error: "Not logged in" });
    try {
        const user = await UserModel.findOne({ id: req.session.userId }).lean();
        if (!user)
            return res.status(404).json({ error: "User not found" });
        res.json({ id: user.id, email: user.email, name: user.name, isAdmin: user.role === "admin" });
    }
    catch (e) {
        res.status(500).json({ error: "Server error" });
    }
});
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
});
authRouter.post("/login", async (req, res) => {
    const parse = loginSchema.safeParse(req.body);
    if (!parse.success)
        return res.status(400).json(parse.error);
    const { email, password } = parse.data;
    try {
        const user = await UserModel.findOne({ email: email.toLowerCase() });
        if (!user)
            return res.status(401).json({ error: "Invalid credentials" });
        const valid = await verifyPassword(password, user.password_hash);
        if (!valid)
            return res.status(401).json({ error: "Invalid credentials" });
        req.session.userId = user.id;
        req.session.isAdmin = user.role === "admin";
        res.json({ id: user.id, email: user.email, name: user.name, isAdmin: user.role === "admin" });
    }
    catch (e) {
        res.status(500).json({ error: "Login failed" });
    }
});
authRouter.post("/logout", (req, res) => {
    req.session.destroy(() => res.json({ message: "Logged out" }));
});
