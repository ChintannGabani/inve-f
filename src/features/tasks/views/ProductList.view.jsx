import React from 'react';
import {
    TrashIcon,
    PencilSquareIcon,
    FunnelIcon,
    PlusIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const ProductListView = ({
    products,
    categories = [],
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    stockFilter,
    setStockFilter,
    sortBy,
    setSortBy,
    pagination,
    onPageChange,
    handleDelete,
    navigate
}) => {
    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Product Catalog</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Manage your inventory and store prices.</p>
                </div>
                <button
                    onClick={() => navigate('/products/add')}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl hover:bg-indigo-700 transition-all shadow-xl font-black transform active:scale-95"
                >
                    <PlusIcon className="h-5 w-5" />
                    Add Product
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8">
                <div className="lg:col-span-4 relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <MagnifyingGlassIcon className="h-5 w-5" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-5 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm transition-all font-medium"
                    />
                </div>

                <div className="lg:col-span-3 relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <FunnelIcon className="h-5 w-5" />
                    </div>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="w-full pl-12 pr-10 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white appearance-none transition-all font-bold shadow-sm"
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div className="lg:col-span-3 relative">
                    <select
                        value={stockFilter}
                        onChange={(e) => setStockFilter(e.target.value)}
                        className="w-full pl-5 pr-10 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white appearance-none transition-all font-bold shadow-sm"
                    >
                        <option value="all">Any Stock Status</option>
                        <option value="in">In Stock</option>
                        <option value="out">Out of Stock</option>
                    </select>
                </div>

                <div className="lg:col-span-2 relative">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full pl-5 pr-10 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white appearance-none transition-all font-bold shadow-sm"
                    >
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="createdAt-desc">Newest</option>
                    </select>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-700/50">
                                <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Product</th>
                                <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Category</th>
                                <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Price</th>
                                <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Stock</th>
                                <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-20 text-center">
                                        <ExclamationTriangleIcon className="h-10 w-10 text-amber-400 mx-auto mb-4" />
                                        <p className="text-gray-500 dark:text-gray-400 font-bold text-xl">No products found.</p>
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product._id} className="hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={product.image ? `http://localhost:8000/temp/${product.image}` : 'https://via.placeholder.com/150'}
                                                    alt={product.title}
                                                    className="w-12 h-12 rounded-xl object-cover border border-gray-100 dark:border-gray-600"
                                                />
                                                <div>
                                                    <p className="font-bold text-gray-900 dark:text-white leading-tight">{product.title}</p>
                                                    <p className="text-xs text-gray-400 mt-1 line-clamp-1 max-w-[200px]">{product.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300 rounded-lg">
                                                {product.category?.name || 'Uncategorized'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 font-black text-indigo-600 dark:text-indigo-400">
                                            ${product.price ? product.price.toFixed(2) : '0.00'}
                                        </td>
                                        <td className="px-6 py-5">
                                            {product.stock > 0 ? (
                                                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                                    {product.stock} in stock
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400">
                                                    <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                                                    Out of stock
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => navigate(`/products/edit/${product._id}`)}
                                                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all"
                                                >
                                                    <PencilSquareIcon className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all"
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {pagination.totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-2">
                    <button
                        onClick={() => onPageChange(pagination.currentPage - 1)}
                        disabled={pagination.currentPage === 1}
                        className="p-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 disabled:opacity-30 transition-all hover:bg-gray-50 shadow-sm"
                    >
                        <ChevronLeftIcon className="h-5 w-5" />
                    </button>

                    {[...Array(pagination.totalPages)].map((_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => onPageChange(i + 1)}
                            className={`w-12 h-12 rounded-2xl font-black transition-all shadow-sm ${pagination.currentPage === i + 1 ? 'bg-indigo-600 text-white scale-110' : 'bg-white dark:bg-gray-800 text-gray-400 hover:text-indigo-600 border border-gray-100 dark:border-gray-700'}`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => onPageChange(pagination.currentPage + 1)}
                        disabled={pagination.currentPage === pagination.totalPages}
                        className="p-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 disabled:opacity-30 transition-all hover:bg-gray-50 shadow-sm"
                    >
                        <ChevronRightIcon className="h-5 w-5" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductListView;
