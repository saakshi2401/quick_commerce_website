import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        toast.error('Failed to load product details');
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    dispatch(addToCart({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      qty: Number(qty)
    }));
    toast.success('Added to your cart!');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-accentDark"></div></div>;
  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-10">
      <div className="w-full md:w-[45%] flex justify-center bg-white p-8 rounded-2xl border border-gray-100 shadow-sm mix-blend-multiply">
        <img src={product.image} alt={product.name} className="w-full max-w-sm" />
      </div>
      <div className="w-full md:w-[55%] flex flex-col justify-center">
        <span className="text-[12px] text-purple-700 font-black uppercase tracking-wider mb-2 bg-purple-50 self-start px-2 py-1 rounded">⚡ 10 Mins Delivery</span>
        
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-1">{product.name}</h1>
        <p className="text-sm font-medium text-gray-500 mb-4">{product.weight || '1 pc'}</p>
        
        <div className="flex items-center space-x-2 mb-6">
          <p className="text-2xl font-black text-gray-900">₹{product.price}</p>
          <del className="text-sm text-gray-400 font-semibold mt-1">₹{Math.floor(product.price * 1.2)}</del>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <select 
            value={qty} 
            onChange={(e) => setQty(e.target.value)}
            className="bg-white border border-gray-200 outline-none focus:border-purple-500 rounded-xl px-4 py-3 font-bold shadow-sm"
          >
            {[...Array(Math.min(product.stock, 10)).keys()].map(x => (
              <option key={x + 1} value={x + 1}>{x + 1}</option>
            ))}
          </select>

          <button 
            onClick={handleAddToCart}
            className="flex-1 bg-purple-700 hover:bg-purple-800 active:scale-95 transition-all text-white font-black py-3 px-8 rounded-xl shadow-md"
          >
            ADD TO CART
          </button>
        </div>

        <div className="mt-4 pt-6 border-t border-gray-100">
          <h3 className="font-bold text-gray-800 mb-2">Product Details</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {product.description}
          </p>

          <div className="text-[13px] text-gray-600 space-y-3 font-medium bg-gray-50 p-4 rounded-xl">
            <p className="flex items-center"><span className="mr-2 text-green-600">✔</span> Delivery in 10 minutes</p>
            <p className="flex items-center"><span className="mr-2 text-green-600">✔</span> Top Quality Assured</p>
            <p className="flex items-center"><span className="mr-2 text-green-600">✔</span> Wide Assortment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
