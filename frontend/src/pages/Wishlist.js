/**
 * Wishlist Page
 * =============
 * Displays all products saved to the user's wishlist/favorites.
 * Features:
 * - Product cards in a responsive grid layout
 * - \"Move to Cart\" button (disabled if already in cart)
 * - Remove from wishlist button
 * - Empty wishlist state with \"Browse Products\" CTA
 * Wishlist data is managed via Redux and persisted in localStorage.
 */



import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromWishlist } from '../store/slices/wishlistSlice';
import { addToCart } from '../store/slices/cartSlice';
import { FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import { toast } from 'sonner';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { items: wishlistItems } = useSelector(state => state.wishlist);
  const { items: cartItems } = useSelector(state => state.cart);

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
    toast.success('Removed from wishlist');
  };

  const handleMoveToCart = (item) => {
    const isInCart = cartItems.some(cartItem => cartItem.id === item.id);
    if (!isInCart) {
      dispatch(addToCart(item));
      toast.success('Added to cart!');
    } else {
      toast.info('Item already in cart');
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center pt-20" data-testid="empty-wishlist">
        <FiHeart size={64} className="text-[#A3A3A3] mb-4" />
        <h2 className="text-white text-2xl font-bold mb-2">Your wishlist is empty</h2>
        <p className="text-[#A3A3A3] mb-6">Save your favorite items here</p>
        <Link
          to="/"
          className="bg-[#F97316] text-white hover:bg-[#EA580C] px-6 py-3 font-semibold rounded-none tracking-wide transition-colors uppercase text-sm"
          data-testid="browse-products-btn"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white mb-8">
          MY WISHLIST
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="wishlist-items">
          {wishlistItems.map((item) => {
            const discountedPrice = (item.price * 0.85).toFixed(2);
            const isInCart = cartItems.some(cartItem => cartItem.id === item.id);

            return (
              <div
                key={item.id}
                className="bg-[#0A0A0A] border border-white/10 overflow-hidden flex flex-col"
                data-testid={`wishlist-item-${item.id}`}
              >
                {/* Image */}
                <Link to={`/product/${item.id}`}>
                  <div className="bg-white aspect-[4/5] overflow-hidden flex items-center justify-center p-6 relative group">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>

                {/* Content */}
                <div className="p-5 flex flex-col gap-2 flex-grow bg-[#0A0A0A]">
                  <div className="text-xs text-[#F97316] uppercase tracking-wide font-semibold">
                    {item.category}
                  </div>
                  <Link to={`/product/${item.id}`}>
                    <h3 className="text-white font-semibold text-sm line-clamp-2 leading-snug hover:text-[#F97316] transition-colors">
                      {item.title}
                    </h3>
                  </Link>
                  <div className="flex items-baseline space-x-2 mt-2">
                    <span className="text-white font-bold text-lg">${discountedPrice}</span>
                    <span className="text-[#A3A3A3] line-through text-sm">${item.price}</span>
                  </div>

                  {/* Actions */}
                  <div className="mt-auto space-y-2">
                    <button
                      onClick={() => handleMoveToCart(item)}
                      disabled={isInCart}
                      className={`w-full px-4 py-3 font-semibold rounded-none tracking-wide transition-colors uppercase text-xs flex justify-center items-center space-x-2 ${
                        isInCart
                          ? 'bg-transparent text-white border border-white/20 cursor-not-allowed'
                          : 'bg-[#F97316] text-white hover:bg-[#EA580C]'
                      }`}
                      data-testid={`move-to-cart-${item.id}`}
                    >
                      <FiShoppingCart size={16} />
                      <span>{isInCart ? 'In Cart' : 'Move to Cart'}</span>
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="w-full px-4 py-3 font-semibold rounded-none tracking-wide transition-colors uppercase text-xs flex justify-center items-center space-x-2 bg-transparent text-[#A3A3A3] border border-white/20 hover:border-[#EF4444] hover:text-[#EF4444]"
                      data-testid={`remove-from-wishlist-${item.id}`}
                    >
                      <FiTrash2 size={16} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;