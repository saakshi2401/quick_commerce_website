import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../redux/authSlice';
import api from '../services/api';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      dispatch(setCredentials(data));
      toast.success('Login Successful');
      navigate('/');
    } catch (err) {
      toast.error(err?.response?.data?.message || err.error || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[70vh]">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h1 className="text-3xl font-black text-gray-900 mb-6 text-center">Login to QuickCart</h1>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-medium"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-medium"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-700 text-white py-3.5 mt-4 rounded-xl font-black hover:bg-purple-800 disabled:opacity-50 transition-colors shadow-md"
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>
        <div className="mt-6 text-center">
           <p className="text-[13px] font-medium text-gray-600 mb-4">
             Don't have an account?{' '}
             <Link to="/register" className="text-purple-700 font-bold hover:underline">Sign up</Link>
           </p>
           <p className="text-sm text-gray-600 font-medium pb-2 border-t border-gray-100 pt-4">Admin Credentials:</p>
           <p className="text-xs text-gray-500">Email: sakshipatil24january@gmail.com</p>
           <p className="text-xs text-gray-500">Password: sakshipatil123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
