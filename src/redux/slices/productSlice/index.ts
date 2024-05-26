// src/store/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../store';
// Async thunk for fetching products by category
const end_point = "products-list"
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch(`${BASE_URL + end_point}`);
    const data = await response.json();
    return { products: data };
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.products;
      })
      .addCase(fetchProducts.rejected, (state: any, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
