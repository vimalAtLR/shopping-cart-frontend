import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

// initial state
const initialState = {
  items: [],
  status: null,
};

// fetchProduct
export const fetchProduct = createAsyncThunk(
    'fetchProducts',
    async () => {
        const response = await axios.get("http://localhost:8000/products");
        return response?.data;
    }
)

// createSlice for product
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // this increment method is just for testing purpose
    increment: (state, action) => {
      state.items = [1];
    },
  },
  extraReducers: {
    [fetchProduct.pending] : (state, action) => {
        state.status = 'pending';
    },
    [fetchProduct.fulfilled] : (state, action) => {
        state.status = 'fulfilled';
        state.items = action.payload;
    },
    [fetchProduct.rejected] : (state, action) => {
        state.status = 'rejected';
    }
  }
});


// Generate actions
export const { increment } = productSlice.actions;

// Generate reducer
export const productReducer = productSlice.reducer;