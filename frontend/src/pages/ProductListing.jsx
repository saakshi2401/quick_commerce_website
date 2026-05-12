import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import api from '../services/api';
import { useLocation } from 'react-router-dom';

const categories = ['All', 'Dairy, Bread & Eggs', 'Snacks & Munchies', 'Cold Drinks & Juices', 'Fruits & Vegetables', 'Cleaning Essentials', 'Sweet Tooth'];

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword') || '';
  
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = `/products?`;
        if (keyword) url += `keyword=${keyword}&`;
        if (selectedCategory && selectedCategory !== 'All') url += `category=${encodeURIComponent(selectedCategory)}`;
        
        const { data } = await api.get(url);
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [keyword, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Search Header or Category Header */}
      {!keyword && (
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4 border-b border-gray-100 pb-4">
          <div className="flex gap-2.5 overflow-x-auto w-full md:w-auto hide-scrollbar snap-x">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-[13px] font-bold whitespace-nowrap transition-all snap-start border ${
                  selectedCategory === cat 
                  ? 'bg-purple-100 text-purple-800 border-purple-200' 
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {keyword && (
        <h2 className="text-xl font-bold mb-6 text-gray-800">
          Search Results for <span className="text-accentDark">"{keyword}"</span>
        </h2>
      )}

      {loading ? (
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-accentDark"></div>
        </div>
      ) : products.length === 0 ? (
         <div className="min-h-[50vh] flex flex-col items-center justify-center text-gray-400">
           <svg className="w-20 h-20 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
           <p className="text-lg font-medium text-gray-600">We couldn't find any items.</p>
           <p className="text-sm">Try searching for "Milk", "Bread", or "Chips".</p>
         </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListing;
