import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://67209751cf285f60d77a6576.mockapi.io/products';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        addProduct: (state, action) => {
            state.items.push(action.payload);
        },
        deleteProduct: (state, action) => {
            state.items = state.items.filter(product => product.id !== action.payload);
        },
        updateProduct: (state, action) => {
            const index = state.items.findIndex(p => p.id === action.payload.id);
            if (index !== -1) state.items[index] = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { addProduct, deleteProduct, updateProduct } = productSlice.actions;
export default productSlice.reducer;
