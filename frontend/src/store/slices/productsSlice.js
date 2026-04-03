/**
 * Products Slice
 * ==============
 * Manages product data fetched from the Fake Store API.
 * Uses Redux Toolkit's createAsyncThunk for async API calls.
 * Tracks loading state and errors for the UI to display.
 */



import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for the API(FASTAPI)
const API = process.env.REACT_APP_API;


console.log("API URL:", process.env.REACT_APP_API);

/**
 * Async thunk to fetch all products from the Fake Store API.
 * Returns an array of product objects with id, title, price, image, etc.
 */

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/products`);

      // Handle both array and object response
      if (Array.isArray(response.data)) {
        return response.data;
      }

      if (Array.isArray(response.data.products)) {
        return response.data.products;
      }

      if (Array.isArray(response.data.data)) {
        return response.data.data;
      }

      return [];
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],     // Array of product objects
    categories: [],// Array of category strings
    loading: false, // Loading indicator for product fetch
    error: null,    // Error message if fetch fails
    
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;

        state.categories = [
          ...new Set(
            action.payload
              .map((product) => product.category)
              .filter((category) => category && String(category).trim() !== '')
          ),
        ];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default productsSlice.reducer;