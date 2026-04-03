/**
 * Wishlist Slice Unit Tests
 * =========================
 * Tests for the Redux wishlist slice reducers:
 * - Adding items to wishlist
 * - Removing items from wishlist
 * - Clearing the wishlist
 * - Preventing duplicate entries
 */
import wishlistReducer, { addToWishlist, removeFromWishlist, clearWishlist } from '../store/slices/wishlistSlice';

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

// Sample product data for testing
const sampleProduct = {
  id: 1,
  title: 'Test Product',
  price: 29.99,
  image: 'https://example.com/image.jpg',
  category: 'electronics',
};

describe('wishlistSlice', () => {
  const initialState = { items: [] };

  test('should return the initial state', () => {
    const result = wishlistReducer(undefined, { type: '' });
    expect(result).toHaveProperty('items');
    expect(Array.isArray(result.items)).toBe(true);
  });

  test('should add an item to the wishlist', () => {
    const state = wishlistReducer(initialState, addToWishlist(sampleProduct));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe(1);
    expect(state.items[0].title).toBe('Test Product');
  });

  test('should not add duplicate items to the wishlist', () => {
    const stateWithItem = { items: [sampleProduct] };
    const state = wishlistReducer(stateWithItem, addToWishlist(sampleProduct));
    expect(state.items).toHaveLength(1);
  });

  test('should remove an item from the wishlist', () => {
    const stateWithItem = { items: [sampleProduct] };
    const state = wishlistReducer(stateWithItem, removeFromWishlist(1));
    expect(state.items).toHaveLength(0);
  });

  test('should clear the entire wishlist', () => {
    const stateWithItems = {
      items: [
        sampleProduct,
        { id: 2, title: 'Product 2', price: 19.99 },
      ],
    };
    const state = wishlistReducer(stateWithItems, clearWishlist());
    expect(state.items).toHaveLength(0);
  });

  test('should not remove an item that does not exist', () => {
    const stateWithItem = { items: [sampleProduct] };
    const state = wishlistReducer(stateWithItem, removeFromWishlist(999));
    expect(state.items).toHaveLength(1);
  });
});
