/**
 * Redux Store Configuration
 * =========================
 * Central Redux store combining all feature slices:
 * - products: Product data fetched from Fake Store API
 * - cart: Shopping cart items (persisted to localStorage)
 * - wishlist: Saved/favorite items (persisted to localStorage)
 * - auth: User authentication state (JWT token + user info)
 * - filters: Category and search filters for product browsing
 */
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import authReducer from './slices/authSlice';
import filtersReducer from './slices/filtersSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
    filters: filtersReducer,
  },
});

export default store;