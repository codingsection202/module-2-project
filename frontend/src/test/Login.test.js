/**
 * Login Page Unit Tests
 * =====================
 * Tests for the Login/Register page:
 * - Form rendering (login and register modes)
 * - Form validation (empty fields, invalid email, short password)
 * - Toggle between login and register modes
 * - Error message display
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/slices/authSlice';
import Login from '../pages/Login';

// Mock localStorage
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

// Helper to render Login page with Redux store
const renderLogin = (isAuthenticated = false) => {
  const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState: {
      auth: { user: null, token: null, isAuthenticated },
    },
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    ),
  };
};

describe('Login Page', () => {
  test('renders login form by default', () => {
    renderLogin();
    expect(screen.getByText('WELCOME BACK')).toBeInTheDocument();
    expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-btn')).toBeInTheDocument();
  });

  test('does not show name field in login mode', () => {
    renderLogin();
    expect(screen.queryByTestId('name-input')).not.toBeInTheDocument();
  });

  test('toggles to register mode when \"Sign Up\" is clicked', () => {
    renderLogin();
    fireEvent.click(screen.getByTestId('toggle-auth-mode'));
    expect(screen.getByText('CREATE ACCOUNT')).toBeInTheDocument();
    expect(screen.getByText('Join NexaStore today')).toBeInTheDocument();
    expect(screen.getByTestId('name-input')).toBeInTheDocument();
  });

  test('toggles back to login mode from register mode', () => {
    renderLogin();
    // Go to register
    fireEvent.click(screen.getByTestId('toggle-auth-mode'));
    expect(screen.getByText('CREATE ACCOUNT')).toBeInTheDocument();
    // Go back to login
    fireEvent.click(screen.getByTestId('toggle-auth-mode'));
    expect(screen.getByText('WELCOME BACK')).toBeInTheDocument();
  });

  test('shows email error when submitting empty email', () => {
    renderLogin();
    fireEvent.click(screen.getByTestId('submit-btn'));
    expect(screen.getByTestId('email-error')).toHaveTextContent('Email is required');
  });

  test('shows password error when submitting empty password', () => {
    renderLogin();
    fireEvent.click(screen.getByTestId('submit-btn'));
    expect(screen.getByTestId('password-error')).toHaveTextContent('Password is required');
  });

  test('shows email format error for invalid email', () => {
    renderLogin();
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'invalid-email', name: 'email' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password123', name: 'password' } });
    fireEvent.click(screen.getByTestId('submit-btn'));
    expect(screen.getByTestId('email-error')).toHaveTextContent('Invalid email format');
  });

  test('shows password length error for short password', () => {
    renderLogin();
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'test@test.com', name: 'email' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: '123', name: 'password' } });
    fireEvent.click(screen.getByTestId('submit-btn'));
    expect(screen.getByTestId('password-error')).toHaveTextContent('Password must be at least 6 characters');
  });

  test('shows name error when registering without name', () => {
    renderLogin();
    // Switch to register mode
    fireEvent.click(screen.getByTestId('toggle-auth-mode'));
    // Fill in email and password but not name
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'test@test.com', name: 'email' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password123', name: 'password' } });
    fireEvent.click(screen.getByTestId('submit-btn'));
    expect(screen.getByTestId('name-error')).toHaveTextContent('Name is required');
  });

  test('clears error message when user starts typing', () => {
    renderLogin();
    // Submit empty to trigger errors
    fireEvent.click(screen.getByTestId('submit-btn'));
    expect(screen.getByTestId('email-error')).toBeInTheDocument();
    // Start typing in email
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 't', name: 'email' } });
    expect(screen.queryByTestId('email-error')).not.toBeInTheDocument();
  });

  test('clears form fields when toggling between login and register', () => {
    renderLogin();
    // Type in login fields
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'test@test.com', name: 'email' } });
    // Switch to register
    fireEvent.click(screen.getByTestId('toggle-auth-mode'));
    // Fields should be cleared
    expect(screen.getByTestId('email-input')).toHaveValue('');
  });
});
