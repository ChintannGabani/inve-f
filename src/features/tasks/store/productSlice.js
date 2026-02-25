import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../api/axios';
import { toast } from 'react-toastify';

export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async (params, { rejectWithValue }) => {
        try {
            const response = await API.get('/products', { params });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
        }
    }
);

export const addProduct = createAsyncThunk(
    'product/addProduct',
    async (productData, { rejectWithValue }) => {
        try {
            const response = await API.post('/products', productData);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add product');
        }
    }
);

export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async ({ id, productData }, { rejectWithValue }) => {
        try {
            const response = await API.put(`/products/${id}`, productData);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update product');
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async (id, { rejectWithValue }) => {
        try {
            await API.delete(`/products/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete product');
        }
    }
);

const initialState = {
    products: [],
    pagination: {
        totalItems: 0,
        totalPages: 0,
        currentPage: 1,
        limit: 10
    },
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clearProductError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Products
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add Product
            .addCase(addProduct.fulfilled, (state, action) => {
                state.products.unshift(action.payload);
                toast.success('Product added successfully');
            })
            // Update Product
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(p => p._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
                toast.success('Product updated successfully');
            })
            // Delete Product
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(p => p._id !== action.payload);
                toast.success('Product deleted successfully');
            });
    }
});

export const { clearProductError } = productSlice.actions;
export default productSlice.reducer;
