/**
 * Cart Page
 * =========
 * Shopping cart page displaying all items added to the cart.
 * Features:
 * - Product thumbnails with links to detail pages
 * - Quantity adjustment (+/-) controls per item
 * - Remove item button
 * - Order summary with subtotal, shipping calculation, and total
 * - Free shipping threshold notification
 * - Empty cart state with \"Continue Shopping\" CTA
 * Cart data is managed via Redux and persisted in localStorage.
 */




import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import { FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { toast } from 'sonner';

const Cart = () => {
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector(state => state.cart);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.success('Removed from cart');
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const subtotal = cartItems.reduce((total, item) => {
    const discountedPrice = item.price * 0.85;
    return total + (discountedPrice * item.quantity);
  }, 0);

  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center pt-20" data-testid="empty-cart">
        <FiShoppingBag size={64} className="text-[#A3A3A3] mb-4" />
        <h2 className="text-white text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-[#A3A3A3] mb-6">Add some products to get started</p>
        <Link
          to="/"
          className="bg-[#F97316] text-white hover:bg-[#EA580C] px-6 py-3 font-semibold rounded-none tracking-wide transition-colors uppercase text-sm"
          data-testid="continue-shopping-btn"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white mb-8">
          SHOPPING CART
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4" data-testid="cart-items">
            {cartItems.map((item) => {
              const discountedPrice = (item.price * 0.85).toFixed(2);
              return (
                <div
                  key={item.id}
                  className="bg-[#171717] border border-white/10 p-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
                  data-testid={`cart-item-${item.id}`}
                >
                  {/* Image */}
                  <Link to={`/product/${item.id}`} className="flex-shrink-0">
                    <div className="bg-white w-full sm:w-32 h-32 flex items-center justify-center p-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="text-xs text-[#F97316] uppercase tracking-wide font-semibold mb-1">
                        {item.category}
                      </div>
                      <Link to={`/product/${item.id}`}>
                        <h3 className="text-white font-semibold text-base mb-2 hover:text-[#F97316] transition-colors">
                          {item.title}
                        </h3>
                      </Link>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-white font-bold text-lg">${discountedPrice}</span>
                        <span className="text-[#A3A3A3] line-through text-sm">${item.price}</span>
                      </div>
                    </div>

                    {/* Quantity and Remove */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="bg-[#0A0A0A] text-white border border-white/10 hover:border-white/30 w-8 h-8 flex items-center justify-center font-bold transition-colors"
                          data-testid={`decrease-qty-${item.id}`}
                        >
                          -
                        </button>
                        <span className="text-white font-semibold w-8 text-center" data-testid={`quantity-${item.id}`}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="bg-[#0A0A0A] text-white border border-white/10 hover:border-white/30 w-8 h-8 flex items-center justify-center font-bold transition-colors"
                          data-testid={`increase-qty-${item.id}`}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-[#A3A3A3] hover:text-[#EF4444] transition-colors"
                        data-testid={`remove-item-${item.id}`}
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#171717] border border-white/10 p-6 sticky top-24" data-testid="order-summary">
              <h2 className="text-white font-bold text-xl mb-6 uppercase tracking-wide">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-[#A3A3A3]">
                  <span>Subtotal</span>
                  <span data-testid="subtotal">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#A3A3A3]">
                  <span>Shipping</span>
                  <span data-testid="shipping">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                {subtotal < 50 && shipping > 0 && (
                  <div className="text-xs text-[#F97316]">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                  </div>
                )}
                <div className="border-t border-white/10 pt-4 flex justify-between text-white font-bold text-lg">
                  <span>Total</span>
                  <span data-testid="total">${total.toFixed(2)}</span>
                </div>
              </div>
              <button
                className="w-full bg-[#F97316] text-white hover:bg-[#EA580C] px-6 py-4 font-semibold rounded-none tracking-wide transition-colors uppercase text-sm active:scale-95"
                data-testid="checkout-btn"
              >
                Proceed to Checkout
              </button>
              <Link
                to="/"
                className="block text-center mt-4 text-[#A3A3A3] hover:text-white transition-colors text-sm"
                data-testid="continue-shopping-link"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;