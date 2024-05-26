// src/store/categorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../store';
//₹ 
const end_point = "product-detail"

// Async thunk for fetching categories
export const fetchProductDetail = createAsyncThunk('categories/fetchProductDetail', async ({
  productId
}: any) => {
  const response = await axios.post(`${BASE_URL + end_point}`, {
    id: productId
  });
  return response.data;
});

const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState: {
    categories: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProductDetail.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchProductDetail.rejected, (state: any, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productDetailSlice.reducer;
