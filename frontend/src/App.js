/**
 * App Component (Root)
 * ====================
 * The main application component that sets up:
 * - Redux Provider for global state management
 * - React Router for client-side routing
 * - Layout structure (Header + Page Content + Footer)
 * - Toast notifications via Sonner library
 */


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';
import { store } from './store/store';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
        {/* Persistent header with navigation, search, and cart/wishlist icons */}
          <Header />
        {/* Page routes - each renders a different page component */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          {/* Persistent footer with links, newsletter, and legal modals */}
          <Footer />
           {/* Toast notification container - styled to match dark theme */}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#171717',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              },
            }}
          />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;