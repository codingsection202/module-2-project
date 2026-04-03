/**
 * Auth Slice
 * ==========
 * Manages user authentication state (login/logout).
 * Persists user info and JWT token to localStorage so the user
 * stays logged in across page refreshes. On logout, clears all
 * user-related data including cart and wishlist from localStorage.
 */


import { createSlice } from '@reduxjs/toolkit';


/**
 * Load authentication state from localStorage on app startup.
 * Returns user object, token, and isAuthenticated flag.
 */
const loadAuthFromLocalStorage = () => {
  try {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (user && token) {
      return { user: JSON.parse(user), token, isAuthenticated: true };
    }
    return { user: null, token: null, isAuthenticated: false };
  } catch (e) {
    return { user: null, token: null, isAuthenticated: false };
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadAuthFromLocalStorage(),
  reducers: {
     // Store user credentials after successful login/registration
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },
    // Clear all auth and user data on logout
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('cart');
      localStorage.removeItem('wishlist');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;