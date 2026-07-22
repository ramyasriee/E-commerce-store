# 🛒 ShopHub E-Commerce Platform

A full-stack e-commerce application built with React, Redux, TypeScript, Node.js, Express, and **MongoDB (Mongoose)** with automatic in-memory fallback.

## ✨ Features

- 🛍️ **50+ Products** across multiple categories (Electronics, Laptops, Smartphones, Accessories, Audio)
- 🔐 **User Authentication** (Register / Login / Logout)
- 🛒 **Shopping Cart** with real-time updates
- 💳 **Checkout System** with order processing
- 📦 **Order Management**
- 👨‍💼 **Admin Panel** for product and user management
- 📊 **Analytics Dashboard**
- 🔍 **Search & Filter** by category and price
- 📱 **Responsive Design** - works on all devices
- 🎨 **Modern UI** with gradient themes and smooth animations

---

## 🚀 Live Demo & Repository

- 🐙 **GitHub Repository:** [https://github.com/mohanat268/ecom.git](https://github.com/mohanat268/ecom.git)
- 🌐 **Frontend App (Vercel):** [https://frontend-peach-mu-52.vercel.app](https://frontend-peach-mu-52.vercel.app)
- ⚙️ **Backend API (Vercel):** [https://backend-peach-two-65.vercel.app/api/products](https://backend-peach-two-65.vercel.app/api/products)

---

## 🛠️ Tech Stack

### Frontend
- React 18.2 + TypeScript
- Redux Toolkit
- React Router v6
- Axios
- Vite

### Backend
- Node.js + Express
- TypeScript
- **MongoDB + Mongoose** (with automatic fallback to In-Memory Data Store)
- Express Session
- Bcryptjs

---

## 💻 Local Development

### Prerequisites
- Node.js 16+
- MongoDB (Optional – if MongoDB is not running, backend automatically runs in In-Memory Mode with 50 seeded products)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/mohanat268/ecom.git
   cd ecom
   ```

2. **Install dependencies**
   ```bash
   # Install Backend Dependencies
   cd backend
   npm install

   # Install Frontend Dependencies
   cd ../frontend
   npm install
   ```

3. **Run the Application**
   ```bash
   # Terminal 1 - Start Backend (Port 4000)
   cd backend
   npm run dev

   # Terminal 2 - Start Frontend (Port 5173)
   cd frontend
   npm run dev
   ```

4. **Access the App in Browser**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:4000/api/products](http://localhost:4000/api/products)


## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current session user
- `POST /api/auth/logout` - Logout user

### Products
- `GET /api/products` - Get all 50+ products
- `GET /api/products/:id` - Get single product details
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get current user orders

### Admin & Analytics
- `GET /api/admin/users` - Get all registered users
- `PUT /api/admin/user/:id` - Update user role
- `DELETE /api/admin/user/:id` - Delete user account
- `GET /api/admin/orders` - Get all customer orders
- `GET /api/analytics/sales` - Get 30-day sales analytics
- `GET /api/analytics/top-products` - Get top-selling products

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is open source and available under the MIT License.
