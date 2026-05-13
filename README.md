# ✨ QuickCart - MERN Stack Platform

## 🌟 Overview

**QuickCart** is a premium full-stack web application that redefines the online shopping experience. Combining the speed of quick-commerce (10-minute delivery) with the elegance of luxury retail, this platform allows users to shop for both high-end items and daily groceries in a unified, sophisticated interface.

Built with the **MERN Stack** (MongoDB, Express, React, Node.js), it features a mobile-first design, robust state management, and an automated product management system.

---

## 🚀 Key Features

### 👤 User Experience
- **🔐 Secure Authentication**: JWT-based login/signup with persistent sessions.
- **🛍️ Premium Catalog**: Browse luxury goods and groceries with intuitive search and category filters.
- **🛒 Dynamic Cart**: Seamless add-to-cart experience with real-time quantity updates and Redux persistence.
- **💳 Smooth Checkout**: Integrated multi-step checkout process with address management.
- **📦 Order Tracking**: Detailed order history and status monitoring.
- **📱 Responsive UI**: Fully optimized for mobile, tablet, and desktop using Tailwind CSS and Framer Motion.

### 🛠️ Admin & Technical
- **📊 Admin Dashboard**: Centralized control for managing products, categories, and viewing global orders.
- **🖼️ Automated Asset Management**: Built-in scripts to automatically fetch and optimize product images using Google APIs.
- **⚡ Performance First**: Vite-powered frontend for lightning-fast HMR and optimized builds.
- **🛡️ Secure Backend**: Password hashing via Bcrypt, CORS protection, and strict API validation.
- **🧪 Database Seeding**: Automated scripts to populate the database with curated luxury and grocery data.

---

## 💻 Tech Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit (RTK)
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Notifications**: React Hot Toast

### Backend
- **Environment**: Node.js
- **API Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT) & BcryptJS
- **Utilities**: Axios, Dotenv, Googlethis (Image Scraper)

---

## 📂 Project Structure

```bash
luxury-quick-commerce/
├── backend/                # Node.js + Express Server
│   ├── config/             # Database & global configs
│   ├── controllers/        # Route logic (Auth, Product, Order)
│   ├── data/               # Static product datasets
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express API endpoints
│   ├── scripts/            # Database seeding & image scrapers
│   └── server.js           # Main entry point
├── frontend/               # React + Vite Application
│   ├── public/             # Static assets & images
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Full page views
│   │   ├── redux/          # RTK slices & store
│   │   ├── services/       # API integration layer
│   │   └── App.jsx         # Main routing & layout
│   └── tailwind.config.js  # UI design tokens
└── README.md
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v16.x or higher)
- MongoDB (Local or Atlas)
- npm or yarn

### 1. Clone & Install
```bash
git clone https://github.com/saakshi2401/quick_commerce_website.git
cd luxury-quick-commerce
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```
**Seed the database:**
```bash
npm run seed
```
**Start the server:**
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🛣️ API Endpoints

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | User/Admin login | No |
| `GET` | `/api/products` | Get all products (with filters) | No |
| `GET` | `/api/products/:id` | Get single product details | No |
| `POST` | `/api/orders` | Create a new order | Yes |
| `GET` | `/api/orders` | Get user's order history | Yes |

---

## 📸 Screenshots

<img width="1062" height="857" alt="image" src="https://github.com/user-attachments/assets/8c75f61d-efe0-4804-842a-ef8db1d8dd44" />
<img width="1102" height="683" alt="image" src="https://github.com/user-attachments/assets/ad8727aa-f09b-42df-9910-c7ebe4e43f0c" />
<img width="1091" height="608" alt="image" src="https://github.com/user-attachments/assets/06c3a959-47ae-4380-a5bc-aae1c1553684" />




---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**Developed by Sakshi**
