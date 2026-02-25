import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../features/tasks/store/productSlice';
import {
  ArchiveBoxIcon,
  ExclamationTriangleIcon,
  TagIcon,
  CurrencyDollarIcon,
  PlusIcon,
  UserIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProducts({ limit: 100 })); // Fetch more for stats
  }, [dispatch]);

  const stats = [
    {
      label: 'Total Products',
      value: products.length,
      color: 'bg-indigo-500',
      icon: <ArchiveBoxIcon className="h-6 w-6" />
    },
    {
      label: 'Out of Stock',
      value: products.filter(p => p.stock <= 0).length,
      color: 'bg-rose-500',
      icon: <ExclamationTriangleIcon className="h-6 w-6" />
    },
    {
      label: 'Low Stock',
      value: products.filter(p => p.stock > 0 && p.stock < 10).length,
      color: 'bg-amber-500',
      icon: <ExclamationTriangleIcon className="h-6 w-6" />
    },
    {
      label: 'Categories',
      value: new Set(products.map(p => p.category?._id || p.category)).size,
      color: 'bg-emerald-500',
      icon: <TagIcon className="h-6 w-6" />
    },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Merchant Command
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
          Welcome, <span className="font-bold text-indigo-600 dark:text-indigo-400">{user?.name}</span>.
          Inventory summary for today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl shadow-indigo-100/50 dark:shadow-none border border-gray-100 dark:border-gray-700 transform hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10 text-indigo-600 dark:text-indigo-400`}>
                {stat.icon}
              </div>
              <div className={`w-2 h-2 rounded-full ${stat.color}`}></div>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-black text-gray-900 dark:text-white mt-2">{loading ? '...' : stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recently Added Products</h3>
            <Link to="/products" className="text-indigo-600 dark:text-indigo-400 text-sm font-bold hover:bg-indigo-50 dark:hover:bg-indigo-900/30 px-4 py-2 rounded-lg transition-colors">
              View All &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Product</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Category</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
                {products.slice(0, 5).map(product => (
                  <tr key={product._id} className="group hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-4 py-5 font-bold text-sm text-gray-800 dark:text-gray-200">{product.title}</td>
                    <td className="px-4 py-5 text-sm text-gray-500 dark:text-gray-400 font-medium">
                      {product.category?.name || 'Uncategorized'}
                    </td>
                    <td className="px-4 py-5 font-black text-indigo-600 dark:text-indigo-400">${product.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <h4 className="text-lg font-bold mb-2">Inventory Management</h4>
            <p className="text-indigo-100 text-sm leading-relaxed">
              Keep your stock levels healthy. Flag items that are low on stock to ensure continuous sales operations.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h4>
            <div className="space-y-3">
              <Link to="/products/add" className="flex items-center p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
                <PlusIcon className="h-5 w-5 mr-3 text-indigo-500" />
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Add Product</span>
              </Link>
              <Link to="/profile" className="flex items-center p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
                <UserIcon className="h-5 w-5 mr-3 text-indigo-500" />
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Admin Profile</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
