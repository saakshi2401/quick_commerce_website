import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import toast from 'react-hot-toast';
import CartDrawer from './CartDrawer';

const Navbar = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const userInfo = useSelector(state => state.auth.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out securely.');
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if(searchTerm.trim()){
      navigate(`/products?keyword=${searchTerm}`);
    } else {
      navigate(`/products`);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(0);
  };

  return (
    <>
      <nav className="fixed w-full top-0 z-50 bg-white shadow-sm border-b border-gray-100 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[76px]">
            
            {/* Logo & Location */}
            <div className="flex items-center space-x-6">
              <Link to="/" className="text-3xl font-black text-accentDark tracking-tight">
                QuickCart
              </Link>
              <div className="hidden md:flex flex-col cursor-pointer hover:bg-gray-50 px-2 pt-1 pb-2 rounded-lg">
                <span className="text-[13px] font-extrabold text-gray-900 leading-tight">Delivery in 10 mins</span>
                <span className="text-[11px] text-gray-500 leading-tight truncate w-32">South Extension I, New Delhi...</span>
              </div>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8 relative hidden sm:block">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                🔍
              </div>
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for groceries, eggs, meat etc." 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-5 py-3 focus:outline-none focus:bg-white focus:ring-1 focus:ring-accentDark/50 transition-all text-sm font-medium"
              />
            </form>

            {/* Right Nav */}
            <div className="flex items-center space-x-6">
              
              {userInfo ? (
                <div className="flex items-center space-x-4">
                  {userInfo.role === 'admin' ? (
                    <Link to="/admin" className="text-sm font-semibold hover:text-accentDark">Admin</Link>
                  ) : null}
                  <Link to="/dashboard" className="text-sm font-semibold hover:text-accentDark">Dashboard</Link>
                  <button onClick={handleLogout} className="text-sm font-semibold hover:text-red-500">Logout</button>
                </div>
              ) : (
                <Link 
                  to="/login"
                  className="text-sm font-bold text-gray-700 hover:text-accentDark hidden md:block"
                >
                  Login
                </Link>
              )}

              {/* Cart Button */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="flex items-center space-x-2 bg-accentDark hover:bg-[#2b1542] text-white px-4 py-2 rounded-lg font-bold transition-colors cursor-pointer"
              >
                <span className="text-lg">🛒</span>
                {cartItems.length > 0 ? (
                  <div className="flex flex-col p-1 text-left">
                    <span className="text-[11px] leading-tight opacity-90">{cartItems.length} items</span>
                    <span className="text-sm leading-tight">₹{calculateTotal()}</span>
                  </div>
                ) : (
                  <span className="text-sm">My Cart</span>
                )}
              </button>

            </div>
          </div>
        </div>
      </nav>
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
