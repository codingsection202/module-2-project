/**
 * Wishlist Slice
 * ==============
 * Manages the user's wishlist (saved/favorite items) with localStorage persistence.
 * Prevents duplicate entries and syncs state with localStorage on every change.
 */

import { createSlice } from '@reduxjs/toolkit';

/**
 * Load data from localStorage by key.
 * Returns an empty array if no data found or on parse error.
 */
const loadFromLocalStorage = (key) => {
  try {
    const serialized = localStorage.getItem(key);
    if (serialized === null) return [];
    return JSON.parse(serialized);
  } catch (e) {
    return [];
  }
};

/**
 * Save data to localStorage under the given key.
 * Silently catches errors (e.g., storage quota exceeded).
 */
const saveToLocalStorage = (key, value) => {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (e) {
    console.error('Error saving to localStorage', e);
  }
};

const wishlistSlice = createSlice({
  name: 'wishlist',
   // Initialize wishlist from localStorage for persistence across sessions
  initialState: {
    items: loadFromLocalStorage('wishlist'),
  },
  reducers: {
    // Add a product to the wishlist (skips if already present)
    addToWishlist: (state, action) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        saveToLocalStorage('wishlist', state.items);
      }
    },
     // Remove a product from the wishlist by its ID
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveToLocalStorage('wishlist', state.items);
    },
    // Clear the entire wishlist
    clearWishlist: (state) => {
      state.items = [];
      saveToLocalStorage('wishlist', state.items);
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;