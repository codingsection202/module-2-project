/**
 * Filters Slice Unit Tests
 * ========================
 * Tests for the Redux filters slice reducers:
 * - Setting category filter
 * - Setting search query
 * - Clearing all filters
 */
import filtersReducer, { setCategory, setSearchQuery, clearFilters } from '../store/slices/filtersSlice';

describe('filtersSlice', () => {
  const initialState = { selectedCategory: 'all', searchQuery: '' };

  test('should return the initial state', () => {
    const result = filtersReducer(undefined, { type: '' });
    expect(result.selectedCategory).toBe('all');
    expect(result.searchQuery).toBe('');
  });

  test('should set the selected category', () => {
    const state = filtersReducer(initialState, setCategory('electronics'));
    expect(state.selectedCategory).toBe('electronics');
  });

  test('should set the search query', () => {
    const state = filtersReducer(initialState, setSearchQuery('laptop'));
    expect(state.searchQuery).toBe('laptop');
  });

  test('should clear all filters to defaults', () => {
    const modifiedState = { selectedCategory: 'electronics', searchQuery: 'laptop' };
    const state = filtersReducer(modifiedState, clearFilters());
    expect(state.selectedCategory).toBe('all');
    expect(state.searchQuery).toBe('');
  });

  test('should handle setting category to \"all\"', () => {
    const modifiedState = { selectedCategory: 'electronics', searchQuery: '' };
    const state = filtersReducer(modifiedState, setCategory('all'));
    expect(state.selectedCategory).toBe('all');
  });

  test('should handle empty search query', () => {
    const modifiedState = { selectedCategory: 'all', searchQuery: 'test' };
    const state = filtersReducer(modifiedState, setSearchQuery(''));
    expect(state.searchQuery).toBe('');
  });
});
