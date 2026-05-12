import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import api from '../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const userInfo = useSelector(state => state.auth.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(0);
  };

  const placeOrder = async () => {
    setLoading(true);
    try {
      if(userInfo) {
        await api.post('/orders', {
          orderItems: cartItems,
          shippingAddress: address || 'Default User Address',
          totalPrice: calculateTotal(),
        });
      }
      dispatch(clearCart());
      setSuccess(true);
      toast.success('Payment successful! Redirecting...', { icon: '💳' });
      setTimeout(() => navigate('/'), 3000);
    } catch (error) {
      toast.error('Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <span className="text-4xl text-green-600">✓</span>
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-2">Order Placed!</h2>
        <p className="text-gray-600 font-medium">Your groceries will arrive in 10 minutes. Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
        <h2 className="text-2xl font-black text-gray-800 mb-6">Delivery Details</h2>
        <div className="mb-6 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <label className="block text-sm font-bold text-gray-700 mb-3">Delivery Address</label>
          <textarea 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-medium"
            rows="3"
            placeholder="E.g., Flat 402, Building A, South Extension..."
          ></textarea>
        </div>
        
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-2">Payment Method</h3>
          <p className="text-[13px] font-medium text-gray-500 mb-5">Pay instantly with our secure dummy gateway.</p>
          <button 
            onClick={placeOrder}
            disabled={loading || cartItems.length === 0}
            className="w-full bg-purple-700 text-white py-3.5 rounded-xl font-black hover:bg-purple-800 disabled:opacity-50 transition-colors shadow-md"
          >
            {loading ? 'Processing...' : `Pay ₹${calculateTotal()}`}
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-black text-gray-800 mb-6">Cart Summary</h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {cartItems.map(item => (
              <div key={item.product} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="bg-white p-1 rounded-lg border border-gray-100">
                    <img src={item.image} alt={item.name} className="w-10 h-10 object-contain mix-blend-multiply" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[13px] text-gray-800 line-clamp-1 max-w-[150px]">{item.name}</h4>
                    <p className="text-[11px] font-bold text-gray-500 mt-0.5">Qty: {item.qty}</p>
                  </div>
                </div>
                <p className="font-black text-[14px]">₹{(item.price * item.qty).toFixed(0)}</p>
              </div>
            ))}
            {cartItems.length === 0 && <p className="text-gray-500 font-medium py-4 text-center">Your cart is empty.</p>}
          </div>

          {cartItems.length > 0 && (
            <div className="mt-6 border-t border-gray-100 pt-5">
              <div className="flex justify-between text-[13px] font-medium text-gray-500 mb-2">
                <span>Item Total</span>
                <span>₹{calculateTotal()}</span>
              </div>
              <div className="flex justify-between text-[13px] font-medium text-gray-500 mb-4">
                <span>Delivery Fee</span>
                <span className="text-green-600 font-bold">FREE</span>
              </div>
              <div className="flex justify-between font-black text-lg text-gray-900 border-t border-gray-100 pt-3">
                <span>To Pay</span>
                <span>₹{calculateTotal()}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
