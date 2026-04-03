/**
 * Header Component
 * ================
 * Fixed navigation bar with:
 * - NexaStore logo and branding
 * - Desktop/mobile navigation links
 * - Search bar (toggleable on desktop, inline on mobile)
 * - Cart and Wishlist icons with item count badges
 * - User icon (login link) / Logout button when authenticated
 * - Responsive mobile hamburger menu
 * Uses glassmorphism effect that intensifies on scroll.
 */



import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiShoppingBag, FiHeart, FiUser, FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { setSearchQuery } from '../store/slices/filtersSlice';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector(state => state.cart);
  const { items: wishlistItems } = useSelector(state => state.wishlist);
  const { isAuthenticated, user } = useSelector(state => state.auth);

  // Track scroll position to change header background opacity
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


// Handle search form submission - dispatches search query to Redux store
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(searchInput));
    setShowSearch(false);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  return (
    <header
      className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b transition-all ${
        isScrolled ? 'bg-black/80 border-white/20' : 'bg-black/60 border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" data-testid="logo-link">
            <div className="w-10 h-10 bg-[#F97316] flex items-center justify-center">
              <span className="text-white font-black text-xl">N</span>
            </div>
            <span className="text-xl font-black tracking-tight text-white">NexaStore</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-[#A3A3A3] hover:text-white transition-colors text-sm font-semibold uppercase tracking-wide"
              data-testid="nav-home"
            >
              Home
            </Link>
            <Link
              to="/"
              className="text-[#A3A3A3] hover:text-white transition-colors text-sm font-semibold uppercase tracking-wide"
              data-testid="nav-shop"
            >
              Shop
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            {/* Search */}
            {showSearch ? (
              <form onSubmit={handleSearch} className="hidden md:flex items-center">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search products..."
                  className="bg-[#171717] border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-[#F97316] focus:border-[#F97316] px-4 py-2 rounded-none placeholder-[#A3A3A3] w-64"
                  autoFocus
                  data-testid="search-input"
                />
                <button
                  type="button"
                  onClick={() => setShowSearch(false)}
                  className="ml-2 text-[#A3A3A3] hover:text-white"
                  data-testid="search-close"
                >
                  <FiX size={20} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="hidden md:block text-[#A3A3A3] hover:text-white transition-colors"
                data-testid="search-icon"
              >
                <FiSearch size={20} />
              </button>
            )}

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative text-[#A3A3A3] hover:text-white transition-colors"
              data-testid="wishlist-icon"
            >
              <FiHeart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#F97316] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold" data-testid="wishlist-count">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative text-[#A3A3A3] hover:text-white transition-colors"
              data-testid="cart-icon"
            >
              <FiShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#F97316] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold" data-testid="cart-count">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User */}
            <Link
              to="/login"
              className="text-[#A3A3A3] hover:text-white transition-colors"
              data-testid="user-icon"
            >
              <FiUser size={20} />
            </Link>

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[#A3A3A3] hover:text-white"
              data-testid="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#A3A3A3] hover:text-white transition-colors text-sm font-semibold uppercase tracking-wide"
                data-testid="mobile-nav-home"
              >
                Home
              </Link>
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#A3A3A3] hover:text-white transition-colors text-sm font-semibold uppercase tracking-wide"
                data-testid="mobile-nav-shop"
              >
                Shop
              </Link>
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search products..."
                  className="bg-[#171717] border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-[#F97316] focus:border-[#F97316] px-4 py-2 rounded-none placeholder-[#A3A3A3] w-full"
                  data-testid="mobile-search-input"
                />
              </form>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;