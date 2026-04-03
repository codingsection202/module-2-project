/**
 * Cart Slice
 * ==========
 * Manages the shopping cart state with localStorage persistence.
 * Cart items survive page refreshes by saving to and loading from localStorage.
 * Each item stores the full product data plus a quantity field.
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

const cartSlice = createSlice({
  name: 'cart',

  // Initialize cart items from localStorage for persistence across sessions
  
  initialState: {
    items: loadFromLocalStorage('cart'),
  },
  reducers: {
    // Add a product to the cart (increments quantity if already present)
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveToLocalStorage('cart', state.items);
    },

     // Remove a product from the cart by its ID
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveToLocalStorage('cart', state.items);
    },
    // Update the quantity of a specific cart item
    updateQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      saveToLocalStorage('cart', state.items);
    },

    // Remove all items from the cart
    clearCart: (state) => {
      state.items = [];
      saveToLocalStorage('cart', state.items);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;