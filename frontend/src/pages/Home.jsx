import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import api from '../services/api';

const categories = [
  { name: 'Dairy & Bread', icon: '🥛', color: 'bg-blue-50' },
  { name: 'Snacks', icon: '🥨', color: 'bg-orange-50' },
  { name: 'Cold Drinks', icon: '🥤', color: 'bg-blue-100' },
  { name: 'Fruits & Veg', icon: '🍎', color: 'bg-green-50' },
  { name: 'Cleaning', icon: '🧼', color: 'bg-purple-50' },
  { name: 'Sweet Tooth', icon: '🍫', color: 'bg-pink-50' },
];

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data.slice(0, 18)); // Display top 18
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-purple-800 to-[#3C1E5C] rounded-2xl p-8 mb-8 flex items-center justify-between shadow-sm border border-purple-900 relative overflow-hidden">
        <div className="max-w-md relative z-10">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
            Groceries in <span className="text-yellow-400">10 minutes</span>
          </h1>
          <p className="text-purple-100 mb-6 text-lg font-medium opacity-90">Fresh produce, everyday essentials, and your favorite snacks delivered at lightning speed.</p>
          <Link to="/products" className="bg-white text-purple-900 px-6 py-2.5 rounded-xl font-bold hover:bg-gray-50 transition-colors inline-flex items-center">
            Shop Now ➔
          </Link>
        </div>
        <div className="hidden md:flex relative z-10 w-72 h-40 bg-[url('https://cdn-icons-png.flaticon.com/512/3081/3081986.png')] bg-contain bg-no-repeat bg-center mix-blend-screen opacity-20"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
      </div>

      {/* Categories Grid */}
      <div className="mb-10">
        <h2 className="text-xl font-black text-gray-800 mb-5">Shop by Category</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link key={cat.name} to={`/products?category=${encodeURIComponent(cat.name)}`} className={`${cat.color} rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow aspect-square border border-white/50 text-center`}>
              <span className="text-4xl md:text-5xl mb-3 drop-shadow-sm">{cat.icon}</span>
              <span className="font-bold text-[13px] text-gray-800 tracking-tight leading-tight">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Grid */}
      <div className="mb-6 flex justify-between items-end">
        <h2 className="text-xl font-black text-gray-800">Bestsellers</h2>
        <Link to="/products" className="text-purple-700 font-bold hover:text-purple-900 text-sm">See all</Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 mb-20">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
