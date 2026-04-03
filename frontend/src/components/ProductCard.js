/**
 * ProductCard Component
 * =====================
 * Displays a single product in a card layout used in the product grid.
 * Features:
 * - Product image with hover zoom effect
 * - Wishlist toggle button (heart icon overlay)
 * - Category label, title, star rating, and pricing (with 15% discount)
 * - Add to Cart / Go to Cart button
 * Entire card is clickable and links to the product detail page.
 */


import { useDispatch, useSelector } from 'react-redux';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlistSlice';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector(state => state.cart);
  const { items: wishlistItems } = useSelector(state => state.wishlist);
  
  const isInCart = cartItems.some(item => item.id === product.id);
  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!isInCart) {
      dispatch(addToCart(product));
      toast.success('Added to cart!');
    }
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
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
        <span key={i} className={i < fullStars ? 'text-[#F97316]' : 'text-[#A3A3A3]'}>
          ★
        </span>
      );
    }
    return stars;
  };

  const discountedPrice = (product.price * 0.85).toFixed(2);

  return (
    <Link to={`/product/${product.id}`} data-testid={`product-card-${product.id}`}>
      <div className="bg-[#0A0A0A] border border-white/10 overflow-hidden group hover:border-white/30 transition-all flex flex-col h-full">
        {/* Image Container */}
        <div className="bg-white aspect-[4/5] overflow-hidden flex items-center justify-center p-6 relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-colors ${
              isInWishlist ? 'bg-[#F97316] text-white' : 'bg-white/80 text-[#0A0A0A] hover:bg-[#F97316] hover:text-white'
            }`}
            data-testid={`wishlist-btn-${product.id}`}
          >
            <FiHeart size={18} fill={isInWishlist ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-2 flex-grow bg-[#0A0A0A]">
          <div className="text-xs text-[#F97316] uppercase tracking-wide font-semibold">
            {product.category}
          </div>
          <h3 className="text-white font-semibold text-sm line-clamp-2 leading-snug">
            {product.title}
          </h3>
          <div className="flex items-center space-x-1 text-sm">
            {renderStars(product.rating?.rate || 4)}
            <span className="text-[#A3A3A3] text-xs ml-2">({product.rating?.count || 0})</span>
          </div>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-white font-bold text-lg">${discountedPrice}</span>
            <span className="text-[#A3A3A3] line-through text-sm">${product.price}</span>
            <span className="text-[#F97316] text-xs font-semibold">15% OFF</span>
          </div>
          <button
            onClick={handleAddToCart}
            className={`mt-auto px-4 py-3 font-semibold rounded-none tracking-wide transition-colors uppercase text-xs flex justify-center items-center space-x-2 ${
              isInCart
                ? 'bg-transparent text-white border border-white/20 hover:border-white/50'
                : 'bg-[#F97316] text-white hover:bg-[#EA580C]'
            }`}
            data-testid={`add-to-cart-btn-${product.id}`}
          >
            {isInCart ? (
              <>
                <FiShoppingCart size={16} />
                <span>Go to Cart</span>
              </>
            ) : (
              <>
                <FiShoppingCart size={16} />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;