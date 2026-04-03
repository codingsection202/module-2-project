/**
 * CategoryFilter Component Unit Tests
 * ====================================
 * Tests for the CategoryFilter component:
 * - Renders all category buttons including \"All Products\"
 * - Highlights the active category
 * - Dispatches setCategory action on button click
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from '../store/slices/filtersSlice';
import CategoryFilter from '../components/CategoryFilter';

// Helper to render component with a fresh Redux store
const renderWithStore = (categories = [], selectedCategory = 'all') => {
  const store = configureStore({
    reducer: { filters: filtersReducer },
    preloadedState: { filters: { selectedCategory, searchQuery: '' } },
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <CategoryFilter categories={categories} />
      </Provider>
    ),
  };
};

describe('CategoryFilter', () => {
  const mockCategories = ['electronics', \"men's clothing\", \"women's clothing\", 'jewelery'];

  test('renders \"All Products\" button plus all categories', () => {
    renderWithStore(mockCategories);
    expect(screen.getByTestId('category-filter-all')).toBeInTheDocument();
    expect(screen.getByTestId('category-filter-electronics')).toBeInTheDocument();
    expect(screen.getByTestId(\"category-filter-men's clothing\")).toBeInTheDocument();
    expect(screen.getByTestId(\"category-filter-women's clothing\")).toBeInTheDocument();
    expect(screen.getByTestId('category-filter-jewelery')).toBeInTheDocument();
  });

  test('displays correct labels for categories', () => {
    renderWithStore(mockCategories);
    expect(screen.getByText('All Products')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText(\"Men's Clothing\")).toBeInTheDocument();
    expect(screen.getByText(\"Women's Clothing\")).toBeInTheDocument();
    expect(screen.getByText('Jewelry')).toBeInTheDocument();
  });

  test('dispatches setCategory action when a category button is clicked', () => {
    const { store } = renderWithStore(mockCategories);
    fireEvent.click(screen.getByTestId('category-filter-electronics'));
    expect(store.getState().filters.selectedCategory).toBe('electronics');
  });

  test('updates active state when category changes', () => {
    const { store } = renderWithStore(mockCategories);
    // Click electronics
    fireEvent.click(screen.getByText('Electronics'));
    expect(store.getState().filters.selectedCategory).toBe('electronics');
    // Click back to all
    fireEvent.click(screen.getByText('All Products'));
    expect(store.getState().filters.selectedCategory).toBe('all');
  });

  test('renders with empty categories', () => {
    renderWithStore([]);
    // Should still have the \"All Products\" button
    expect(screen.getByText('All Products')).toBeInTheDocument();
  });
});
