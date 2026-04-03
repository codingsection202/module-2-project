/**
 * Product Detail Page
 * ===================
 * Displays full details for a single product fetched by ID from the Fake Store API.
 * Features:
 * - Large product image display
 * - Breadcrumb navigation
 * - Star rating and review count
 * - Discounted pricing (15% off)
 * - Quantity selector
 * - Add to Cart and Wishlist toggle buttons
 * - Shipping and return policy info
 * Handles loading and product-not-found states.
 */

import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlistSlice';
import { FiShoppingCart, FiHeart, FiTruck, FiRefreshCw, FiShield } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector(state => state.cart);
  const { items: wishlistItems } = useSelector(state => state.wishlist);

  const isInCart = cartItems.some(item => item.id === product?.id);
  const isInWishlist = wishlistItems.some(item => item.id === product?.id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8001/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!isInCart && product) {
      dispatch(addToCart({ ...product, quantity }));
      toast.success('Added to cart!');
    }
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      toast.success('Removed from wishlist');
    } else {
      dispatch(addToWishlist(product));
      toast.success('Added to wishlist!');
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < fullStars ? 'text-[#F97316]' : 'text-[#A3A3A3]'} style={{ fontSize: '24px' }}>
          ★
        </span>
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center pt-20" data-testid="loading-spinner">
        <div className="w-12 h-12 border-4 border-[#F97316] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center pt-20" data-testid="product-not-found">
        <p className="text-[#A3A3A3] text-lg mb-4">Product not found</p>
        <Link to="/" className="bg-[#F97316] text-white hover:bg-[#EA580C] px-6 py-3 font-semibold rounded-none tracking-wide transition-colors uppercase text-sm">
          Back to Home
        </Link>
      </div>
    );
  }

  const discountedPrice = (product.price * 0.85).toFixed(2);

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8" data-testid="breadcrumb">
          <Link to="/" className="text-[#A3A3A3] hover:text-white text-sm">
            Home
          </Link>
          <span className="text-[#A3A3A3] mx-2">/</span>
          <span className="text-white text-sm">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white p-12 flex items-center justify-center" data-testid="product-image-container">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-auto max-h-[500px] object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col space-y-6" data-testid="product-details">
            <div>
              <div className="text-xs text-[#F97316] uppercase tracking-wide font-semibold mb-2">
                {product.category}
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white mb-4">
                {product.title}
              </h1>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {renderStars(product.rating?.rate || 4)}
                </div>
                <span className="text-[#A3A3A3] text-sm">({product.rating?.count || 0} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-3">
              <span className="text-white font-black text-3xl">${discountedPrice}</span>
              <span className="text-[#A3A3A3] line-through text-xl">${product.price}</span>
              <span className="text-[#F97316] text-sm font-semibold bg-[#F97316]/10 px-2 py-1">15% OFF</span>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-white font-bold text-lg mb-2">Description</h3>
              <p className="text-[#A3A3A3] text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-white font-bold text-sm mb-2">Quantity</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-[#171717] text-white border border-white/10 hover:border-white/30 w-10 h-10 flex items-center justify-center font-bold transition-colors"
                  data-testid="quantity-decrease"
                >
                  -
                </button>
                <span className="text-white font-semibold text-lg w-12 text-center" data-testid="quantity-value">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-[#171717] text-white border border-white/10 hover:border-white/30 w-10 h-10 flex items-center justify-center font-bold transition-colors"
                  data-testid="quantity-increase"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={isInCart}
                className={`flex-1 px-6 py-4 font-semibold rounded-none tracking-wide transition-all uppercase text-sm flex justify-center items-center space-x-2 ${
                  isInCart
                    ? 'bg-transparent text-white border border-white/20 cursor-not-allowed'
                    : 'bg-[#F97316] text-white hover:bg-[#EA580C] active:scale-95'
                }`}
                data-testid="add-to-cart-btn"
              >
                <FiShoppingCart size={18} />
                <span>{isInCart ? 'In Cart' : 'Add to Cart'}</span>
              </button>
              <button
                onClick={handleWishlistToggle}
                className={`px-6 py-4 font-semibold rounded-none tracking-wide transition-all uppercase text-sm ${
                  isInWishlist
                    ? 'bg-[#F97316] text-white hover:bg-[#EA580C]'
                    : 'bg-transparent text-white border border-white/20 hover:border-white/50'
                }`}
                data-testid="wishlist-toggle-btn"
              >
                <FiHeart size={18} fill={isInWishlist ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Features */}
            <div className="border-t border-white/10 pt-6 space-y-4">
              <div className="flex items-center space-x-3">
                <FiTruck className="text-[#F97316]" size={20} />
                <span className="text-[#A3A3A3] text-sm">Free delivery on orders over $50</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiRefreshCw className="text-[#F97316]" size={20} />
                <span className="text-[#A3A3A3] text-sm">30-day return policy</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiShield className="text-[#F97316]" size={20} />
                <span className="text-[#A3A3A3] text-sm">Secure payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;