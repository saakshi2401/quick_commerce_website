import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const userInfo = useSelector(state => state.auth.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo || userInfo.role !== 'admin') {
      navigate('/');
    } else {
      fetchProducts();
    }
  }, [userInfo, navigate]);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this product?')) {
      await api.delete(`/products/${id}`);
      fetchProducts();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold mb-8">Admin Dashboard</h2>
      
      <div className="bg-cardLight dark:bg-cardDark p-6 rounded-xl border border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Manage Products</h3>
          <button className="bg-accentDark dark:bg-accentGlow text-white px-4 py-2 rounded-lg text-sm font-medium">
            + Add Product
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p._id} className="border-b border-gray-100 dark:border-gray-900">
                  <td className="py-3 px-4 font-medium">{p.name}</td>
                  <td className="py-3 px-4">₹{p.price}</td>
                  <td className="py-3 px-4">{p.category}</td>
                  <td className="py-3 px-4 space-x-3">
                    <button className="text-blue-500 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(p._id)} className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
