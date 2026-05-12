import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const userInfo = useSelector(state => state.auth.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    } else {
      const fetchOrders = async () => {
        try {
          const { data } = await api.get('/orders/myorders');
          setOrders(data);
        } catch (e) {
          console.error(e);
        }
      };
      fetchOrders();
    }
  }, [userInfo, navigate]);

  if (!userInfo) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-6 mb-10">
        <div className="w-16 h-16 rounded-full bg-accentDark dark:bg-accentGlow flex items-center justify-center text-white text-2xl font-bold">
          {userInfo.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-3xl font-bold">Welcome, {userInfo.name}</h2>
          <p className="text-gray-500 text-sm">{userInfo.email}</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-6">Your Recent Orders</h3>
      
      {orders.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center text-gray-500">
          You haven't placed any orders yet. Start shopping!
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-50">
                <div className="text-sm">
                  <span className="text-gray-500">Order ID: </span> <span className="font-mono font-bold text-gray-700">{order._id}</span>
                </div>
                <div className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider ${order.status === 'Pending' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                  {order.status}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm mb-2 text-gray-500">Items:</p>
                  {order.orderItems.map(item => (
                    <div key={item.product} className="flex gap-3 text-sm items-center mb-2">
                       <img src={item.image} className="w-8 h-8 rounded cover" alt="item"/>
                       <span>{item.qty}x {item.name}</span>
                    </div>
                  ))}
                </div>
                <div className="text-right flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Price:</p>
                    <p className="text-2xl font-bold">₹{order.totalPrice.toFixed(2)}</p>
                  </div>
                  <p className="text-xs text-gray-400 mt-4">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
