/**
 * Auth Slice Unit Tests
 * =====================
 * Tests for the Redux auth slice reducers:
 * - Setting user credentials (login)
 * - Logging out (clearing all data)
 * - Initial state from localStorage
 */
import authReducer, { setCredentials, logout } from '../store/slices/authSlice';

// Mock localStorage for testing
beforeEach(() => {
  const localStorageMock = (() => {
    let store = {};
    return {
      getItem: jest.fn((key) => store[key] || null),
      setItem: jest.fn((key, value) => { store[key] = value; }),
      removeItem: jest.fn((key) => { delete store[key]; }),
      clear: jest.fn(() => { store = {}; }),
    };
  })();
  Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true });
});

// Sample user data for testing
const sampleUser = {
  id: 'user-123',
  email: 'test@nexastore.com',
  name: 'Test User',
};

describe('authSlice', () => {
  const initialState = { user: null, token: null, isAuthenticated: false };

  test('should return the initial state', () => {
    const result = authReducer(undefined, { type: '' });
    expect(result).toHaveProperty('user');
    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('isAuthenticated');
  });

  test('should set user credentials on login', () => {
    const state = authReducer(initialState, setCredentials({
      user: sampleUser,
      token: 'jwt-test-token-123',
    }));
    expect(state.isAuthenticated).toBe(true);
    expect(state.user.email).toBe('test@nexastore.com');
    expect(state.user.name).toBe('Test User');
    expect(state.token).toBe('jwt-test-token-123');
  });

  test('should store credentials in localStorage on login', () => {
    authReducer(initialState, setCredentials({
      user: sampleUser,
      token: 'jwt-test-token-123',
    }));
    expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(sampleUser));
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'jwt-test-token-123');
  });

  test('should clear all data on logout', () => {
    const loggedInState = {
      user: sampleUser,
      token: 'jwt-test-token-123',
      isAuthenticated: true,
    };
    const state = authReducer(loggedInState, logout());
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  test('should remove data from localStorage on logout', () => {
    const loggedInState = {
      user: sampleUser,
      token: 'jwt-test-token-123',
      isAuthenticated: true,
    };
    authReducer(loggedInState, logout());
    expect(localStorage.removeItem).toHaveBeenCalledWith('user');
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('cart');
    expect(localStorage.removeItem).toHaveBeenCalledWith('wishlist');
  });
});
