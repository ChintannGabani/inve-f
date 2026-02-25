import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../store/productSlice';
import { fetchCategories } from '../store/categorySlice';
import { useNavigate } from 'react-router-dom';
import ProductListView from '../views/ProductList.view';

const ProductListContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products, pagination, loading } = useSelector((state) => state.product);
    const { categories } = useSelector((state) => state.category);

    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [stockFilter, setStockFilter] = useState('all');
    const [sortBy, setSortBy] = useState('createdAt-desc');
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        const [sortField, sortOrder] = sortBy.split('-');
        dispatch(fetchProducts({
            page,
            limit: 10,
            search: searchQuery,
            category: categoryFilter,
            stock: stockFilter,
            sortBy: sortField,
            sortOrder: sortOrder
        }));
    }, [dispatch, page, searchQuery, categoryFilter, stockFilter, sortBy]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(id));
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <ProductListView
            products={products}
            categories={categories}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            stockFilter={stockFilter}
            setStockFilter={setStockFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            pagination={pagination}
            onPageChange={handlePageChange}
            handleDelete={handleDelete}
            navigate={navigate}
            isLoading={loading}
        />
    );
};

export default ProductListContainer;
