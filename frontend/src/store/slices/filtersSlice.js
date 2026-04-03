/**
 * Filters Slice
 * =============
 * Manages product filtering state for category selection and search functionality.
 * The Home page uses these values to filter the displayed product list.
 */


import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    selectedCategory: 'all',
    searchQuery: '',
  },
  reducers: {
    // Set the active product category filter
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    // Update the search query for product filtering
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    // Reset all filters to their default values
    clearFilters: (state) => {
      state.selectedCategory = 'all';
      state.searchQuery = '';
    },
  },
});

export const { setCategory, setSearchQuery, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;