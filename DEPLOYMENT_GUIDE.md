# 🚀 Deployment Guide - ShopHub E-Commerce

## Quick Deployment Steps

### Prerequisites
1. Create accounts (all free):
   - GitHub: https://github.com/signup
   - Vercel: https://vercel.com/signup
   - Neon: https://neon.tech (for database)

---

## Step 1: Set Up Database (5 minutes)

### Using Neon.tech (Free PostgreSQL)

1. **Go to:** https://neon.tech
2. **Sign up** with GitHub
3. **Create Project:**
   - Name: `shophub-db`
   - Region: Choose closest to you
4. **Copy Connection String:**
   ```
   postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb
   ```
5. **Run SQL Schema:**
   - Go to SQL Editor in Neon dashboard
   - Copy and paste your schema from `backend/schema.sql`
   - Run the queries

---

## Step 2: Deploy Backend (10 minutes)

### Option A: Using Vercel

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy Backend:**
   ```bash
   cd backend
   vercel
   ```
   - Project name: `shophub-api`
   - Follow prompts

4. **Set Environment Variables:**
   ```bash
   vercel env add DATABASE_URL
   # Paste your Neon connection string

   vercel env add SESSION_SECRET
   # Enter: my-super-secret-key-12345

   vercel env add FRONTEND_URL
   # Enter: https://shophub.vercel.app (update later)
   ```

5. **Redeploy:**
   ```bash
   vercel --prod
   ```

6. **Copy Backend URL:**
   ```
   https://shophub-api.vercel.app
   ```

### Option B: Using Render.com

1. **Go to:** https://render.com
2. **New → Web Service**
3. **Connect GitHub repo**
4. **Settings:**
   - Name: `shophub-api`
   - Environment: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
5. **Add Environment Variables:**
   - `DATABASE_URL`: Your Neon connection string
   - `SESSION_SECRET`: `my-super-secret-key-12345`
   - `PORT`: `4000`
6. **Deploy**
7. **Copy URL:** `https://shophub-api.onrender.com`

---

## Step 3: Deploy Frontend (5 minutes)

### Update API URL First:

1. **Edit frontend environment:**
   ```bash
   # Create .env.production file
   echo "VITE_API_URL=https://shophub-api.vercel.app" > frontend/.env.production
   ```

2. **Update axios config** (if needed):
   ```typescript
   // frontend/src/utils/axios-config.ts
   const baseURL = import.meta.env.VITE_API_URL || '/api';
   axios.defaults.baseURL = baseURL;
   ```

### Deploy to Vercel:

1. **Deploy Frontend:**
   ```bash
   cd frontend
   vercel
   ```
   - Project name: `shophub`
   - Framework: `Vite`
   - Follow prompts

2. **Set Environment Variable:**
   ```bash
   vercel env add VITE_API_URL production
   # Enter your backend URL: https://shophub-api.vercel.app
   ```

3. **Deploy Production:**
   ```bash
   vercel --prod
   ```

4. **Get Your Link! 🎉**
   ```
   ✅ https://shophub.vercel.app
   ```

---

## Step 4: Update Backend CORS

After getting frontend URL, update backend environment:

```bash
cd backend
vercel env add FRONTEND_URL production
# Enter: https://shophub.vercel.app

vercel --prod
```

---

## Step 5: Share Your Link! 📱

**Share in WhatsApp:**
```
🛒 Check out my e-commerce store!
https://shophub.vercel.app

Features:
✅ 50+ Products
✅ Shopping Cart
✅ User Authentication
✅ Secure Checkout
✅ Admin Panel
```

---

## Alternative: One-Click Deploy

### Using Railway.app (Easiest!)

1. **Go to:** https://railway.app
2. **Sign in with GitHub**
3. **New Project → Deploy from GitHub**
4. **Select your repo**
5. **Add PostgreSQL:** New → Database → PostgreSQL
6. **Deploy both services**
7. **Done!** ✅

---

## Troubleshooting

### Issue: "Cannot connect to database"
- Check DATABASE_URL is correctly set
- Ensure Neon database is running
- Verify connection string format

### Issue: "CORS error"
- Update FRONTEND_URL in backend env
- Redeploy backend after changing

### Issue: "Build failed"
- Run `npm install` locally first
- Check for TypeScript errors: `npm run build`
- Ensure all dependencies are in package.json

---

## Custom Domain (Optional)

1. **Buy domain** from Namecheap/GoDaddy
2. **In Vercel:**
   - Settings → Domains
   - Add your domain
   - Follow DNS instructions
3. **Result:** `https://shophub.com` 🎉

---

## Monitoring & Updates

### Check Deployment Status:
- Vercel Dashboard: https://vercel.com/dashboard
- View logs, analytics, and errors

### Update Your App:
```bash
# Make changes locally
git add .
git commit -m "Update features"
git push

# Vercel auto-deploys!
```

---

## Free Tier Limits

✅ **Vercel:**
- Unlimited deployments
- 100GB bandwidth/month
- Custom domains included

✅ **Neon:**
- 3GB storage
- 1 database
- Perfect for small projects

✅ **Render:**
- 750 hours/month
- Auto-sleep after 15 min inactivity

---

## 🎯 Final Checklist

- [ ] Database created on Neon
- [ ] Backend deployed with env vars
- [ ] Frontend deployed with API URL
- [ ] CORS configured
- [ ] Test the live link
- [ ] Share on WhatsApp! 🎉

---

**Need Help?**
Email: support@shophub.local

**Your Live Link:**
```
🔗 https://shophub.vercel.app
```

Share this link with anyone - they can use it on phone, tablet, or computer! 📱💻
