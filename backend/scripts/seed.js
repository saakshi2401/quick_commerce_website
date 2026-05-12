import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import connectDB from '../config/db.js';
import { groceryItems } from '../data/groceryItems.js';
import { luxuryItems } from '../data/luxuryItems.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@blackops.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'adminpass';
    await User.create({
      name: 'Super Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
      address: 'HQ'
    });

    const products = [];
    
    groceryItems.forEach((obj, index) => {
      products.push({
        name: obj.name,
        price: parseFloat(obj.price), // Exact real Zepto/Blinkit price
        category: obj.category,
        description: `${obj.name} - delivered to your doorstep in 10 minutes.`,
        weight: obj.weight,
        image: obj.localImage || '/images/wagyu.png',
        stock: Math.floor(Math.random() * 50) + 10,
      });
    });

    luxuryItems.forEach((obj, index) => {
      products.push({
        name: obj.name,
        price: Math.floor(Math.random() * 500) + 100, // Random price for luxury items
        category: obj.category,
        description: `${obj.name} - Premium quality delivered in 10 minutes.`,
        weight: 'N/A',
        image: obj.localImage || '/images/wagyu.png',
        stock: Math.floor(Math.random() * 20) + 5,
      });
    });

    await Product.insertMany(products);
    console.log(`Successfully generated and seeded exactly ${products.length} products (${groceryItems.length} grocery + ${luxuryItems.length} luxury)!`);

    process.exit();
  } catch (error) {
    console.error(`Error with seeder: ${error}`);
    process.exit(1);
  }
};

importData();
