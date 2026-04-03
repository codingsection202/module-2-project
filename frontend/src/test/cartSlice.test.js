/**
 * Cart Slice Unit Tests
 * =====================
 * Tests for the Redux cart slice reducers:
 * - Adding items to cart
 * - Removing items from cart
 * - Updating item quantity
 * - Clearing the cart
 * - Duplicate item handling (quantity increment)
 */


import cartReducer, { addToCart, removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';

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

describe('cartSlice', () => {
  const initialState = { items: [] };

  test('should return the initial state when passed an empty action', () => {
    const result = cartReducer(undefined, { type: '' });
    expect(result).toHaveProperty('items');
    expect(Array.isArray(result.items)).toBe(true);
  });

  test('should add a new item to the cart', () => {
    const state = cartReducer(initialState, addToCart(sampleProduct));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe(1);
    expect(state.items[0].quantity).toBe(1);
    expect(state.items[0].title).toBe('Test Product');
  });

  test('should increment quantity when adding an existing item', () => {
    const stateWithItem = { items: [{ ...sampleProduct, quantity: 1 }] };
    const state = cartReducer(stateWithItem, addToCart(sampleProduct));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  test('should remove an item from the cart', () => {
    const stateWithItem = { items: [{ ...sampleProduct, quantity: 1 }] };
    const state = cartReducer(stateWithItem, removeFromCart(1));
    expect(state.items).toHaveLength(0);
  });

  test('should update item quantity', () => {
    const stateWithItem = { items: [{ ...sampleProduct, quantity: 1 }] };
    const state = cartReducer(stateWithItem, updateQuantity({ id: 1, quantity: 5 }));
    expect(state.items[0].quantity).toBe(5);
  });

  test('should clear all items from the cart', () => {
    const stateWithItems = {
      items: [
        { ...sampleProduct, quantity: 2 },
        { id: 2, title: 'Product 2', price: 19.99, quantity: 1 },
      ],
    };
    const state = cartReducer(stateWithItems, clearCart());
    expect(state.items).toHaveLength(0);
  });

  test('should not remove an item that does not exist', () => {
    const stateWithItem = { items: [{ ...sampleProduct, quantity: 1 }] };
    const state = cartReducer(stateWithItem, removeFromCart(999));
    expect(state.items).toHaveLength(1);
  });
});
