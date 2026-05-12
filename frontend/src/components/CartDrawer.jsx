import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, decreaseQuantity } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const drawerRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'unset'; 
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(0);
  };

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <>
      {/* Overlay backdrop */}
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}></div>
      
      {/* Drawer */}
      <div 
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#f4f6f9] z-[70] shadow-2xl transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="bg-white px-5 py-4 flex items-center justify-between border-b border-gray-100 shrink-0">
          <h2 className="font-black text-lg text-gray-900">My Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 content-scrollbar space-y-4">
          
          {/* Delivery Info Banner */}
          <div className="bg-white p-4 rounded-2xl flex items-center shadow-sm">
            <span className="text-3xl mr-4 drop-shadow-sm">⏱️</span>
            <div>
              <p className="font-black text-[15px] text-gray-800 leading-tight">Delivery in 10 minutes</p>
              <p className="text-[12px] font-medium text-gray-500">To: South Extension I, New Delhi</p>
            </div>
          </div>

          {cartItems.length === 0 ? (
             <div className="h-64 flex flex-col items-center justify-center text-gray-400">
               <span className="text-6xl mb-4 opacity-30">🛒</span>
               <p className="font-bold text-gray-700">Your cart is empty</p>
               <p className="text-sm font-medium mt-1">Let's add some items!</p>
             </div>
          ) : (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
               <h3 className="font-bold text-[13px] text-gray-800 mb-4 pb-2 border-b border-gray-50">Items added</h3>
               
               <div className="space-y-4">
                 {cartItems.map((item) => (
                    <div key={item.product} className="flex gap-4 items-center">
                       <div className="w-14 h-14 bg-gray-50 rounded-lg p-1.5 flex-shrink-0 border border-gray-100">
                         <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                       </div>
                       
                       <div className="flex-1">
                         <h4 className="font-semibold text-[13px] text-gray-800 leading-snug line-clamp-2 mb-0.5">{item.name}</h4>
                         <p className="text-[11px] font-semibold text-gray-500 mb-1">{item.weight || '1 pc'}</p>
                         <p className="font-black text-sm text-gray-900">₹{item.price}</p>
                       </div>

                       <div className="bg-purple-700 text-white rounded-lg flex items-center h-[34px] overflow-hidden shadow-sm flex-shrink-0">
                         <button onClick={() => dispatch(decreaseQuantity(item.product))} className="w-8 h-full flex items-center justify-center hover:bg-purple-800 active:bg-purple-900 font-bold transition-colors">-</button>
                         <span className="w-6 text-center text-[13px] font-bold">{item.qty}</span>
                         <button onClick={() => dispatch(addToCart({...item, qty: item.qty + 1}))} className="w-8 h-full flex items-center justify-center hover:bg-purple-800 active:bg-purple-900 font-bold transition-colors">+</button>
                       </div>
                    </div>
                 ))}
               </div>
            </div>
          )}
          
          {cartItems.length > 0 && (
             <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
               <h3 className="font-bold text-[13px] text-gray-800 mb-3">Bill Details</h3>
               <div className="space-y-2 text-[13px] font-medium text-gray-600">
                  <div className="flex justify-between">
                     <span>Item Total</span>
                     <span>₹{calculateTotal()}</span>
                  </div>
                  <div className="flex justify-between">
                     <span>Delivery fee</span>
                     <span className="text-green-600 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between">
                     <span>Handling fee</span>
                     <span>₹5</span>
                  </div>
               </div>
             </div>
          )}

        </div>

        {/* Footer Checkout */}
        {cartItems.length > 0 && (
          <div className="bg-white border-t border-gray-100 p-4 shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
            <button onClick={handleCheckout} className="w-full bg-purple-700 hover:bg-purple-800 active:bg-purple-900 text-white rounded-xl p-4 flex justify-between items-center transition-colors shadow-md">
               <div className="flex flex-col text-left">
                  <span className="font-black text-[15px] leading-tight">₹{Number(calculateTotal()) + 5}</span>
                  <span className="text-[11px] font-bold text-purple-200">TOTAL</span>
               </div>
               <div className="flex items-center font-black tracking-wide text-sm">
                  Proceed to Checkout
                  <span className="ml-2">➔</span>
               </div>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
