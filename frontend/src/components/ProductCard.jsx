import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decreaseQuantity } from '../redux/cartSlice';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(state => state.cart.cartItems.find(x => x.product === product._id));

  const handleAdd = (e) => {
    e.preventDefault(); 
    dispatch(addToCart({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      weight: product.weight,
      qty: 1
    }));
  };

  const handleDecrease = (e) => {
    e.preventDefault();
    dispatch(decreaseQuantity(product._id));
  };

  const handleIncrease = (e) => {
    e.preventDefault();
    dispatch(addToCart({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      weight: product.weight, 
      qty: cartItem.qty + 1
    }));
  };

  return (
    <Link to={`/product/${product._id}`} className="block bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 relative group overflow-hidden h-full flex flex-col">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#f8f8f8] px-2 py-0.5 rounded-b-lg shadow-sm border border-t-0 border-gray-200 z-10 flex items-center">
        <span className="text-[9px] font-bold tracking-wider text-purple-700">⚡ 10 MINS</span>
      </div>

      <div className="relative p-3 pt-6 bg-white shrink-0">
        <div className="aspect-square bg-[#f9f9f9] rounded-xl flex items-center justify-center p-2 relative overflow-hidden mix-blend-multiply">
          <img src={product.image} alt={product.name} className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-300 mix-blend-multiply drop-shadow-sm" />
        </div>
      </div>
      
      <div className="px-3 pb-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-[13px] font-semibold text-gray-800 leading-tight line-clamp-2 min-h-[30px]">{product.name}</h3>
          <p className="text-[11px] font-medium text-gray-500 mt-1">{product.weight || '1 pc'}</p>
        </div>
        
        <div className="mt-3 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[14px] font-black tracking-tight text-gray-900">₹{product.price}</span>
            <del className="text-[10px] text-gray-400">₹{Math.floor(product.price * 1.2)}</del>
          </div>
          
          {cartItem ? (
            <div className="z-10 bg-purple-700 text-white rounded-lg flex items-center h-[34px] overflow-hidden shadow-sm shadow-purple-200">
               <button onClick={handleDecrease} className="w-8 h-full flex items-center justify-center hover:bg-purple-800 active:bg-purple-900 font-bold transition-colors">-</button>
               <span className="w-6 text-center text-[13px] font-bold">{cartItem.qty}</span>
               <button onClick={handleIncrease} className="w-8 h-full flex items-center justify-center hover:bg-purple-800 active:bg-purple-900 font-bold transition-colors">+</button>
            </div>
          ) : (
            <button 
              onClick={handleAdd}
              className="z-10 bg-[#f3edf9] border border-purple-200 text-purple-800 px-5 h-[34px] rounded-lg text-[13px] font-bold uppercase tracking-wide hover:bg-purple-100 transition-colors active:scale-95"
            >
              Add
            </button>
          )}

        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
