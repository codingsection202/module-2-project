/**
 * Home Page (Dashboard)
 * =====================
 * The main landing page of NexaStore featuring:
 * - Hero banner with parallax scrolling effect and CTA button
 * - Benefits section (free shipping, returns, 24/7 support)
 * - Product grid with category filter integration
 * - Loading spinner and \"no products found\" states
 * Products are fetched from the Fake Store API via Redux thunks on mount.
 */


import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts} from '../store/slices/productsSlice';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import { FiTruck, FiRefreshCw, FiHeadphones } from 'react-icons/fi';

const Home = () => {
  const dispatch = useDispatch();
  const { items: products, categories, loading } = useSelector(state => state.products);
  const { selectedCategory, searchQuery } = useSelector(state => state.filters);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts());
    
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = products.filter((product) => {
  const productCategory = product.category ? product.category.toLowerCase() : '';
  const categoryFilter = selectedCategory ? selectedCategory.toLowerCase() : 'all';

  const matchesCategory =
    categoryFilter === 'all' || productCategory === categoryFilter;

  const title = (product.title || product.name || '').toLowerCase();
  const description = (product.description || '').toLowerCase();
  const search = (searchQuery || '').toLowerCase();

  const matchesSearch =
    search === '' ||
    title.includes(search) ||
    description.includes(search);

  return matchesCategory && matchesSearch;
});

  const heroImages = [
    'https://images.unsplash.com/photo-1649716708340-aa1da90a3c67?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODF8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBkYXJrJTIwYmFja2dyb3VuZHxlbnwwfHx8fDE3NzQ3NTc3NDV8MA&ixlib=rb-4.1.0&q=85',
    'https://images.unsplash.com/photo-1741770067276-a10e15ff5197?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzV8MHwxfHNlYXJjaHwyfHxoaWdoJTIwZW5kJTIwaGVhZHBob25lcyUyMGRhcmt8ZW58MHx8fHwxNzc0NzU3NzQ1fDA&ixlib=rb-4.1.0&q=85'
  ];

  const currentHeroImage = heroImages[Math.floor(Date.now() / 5000) % heroImages.length];

  
console.log('Products from Redux:', products);
console.log('Categories from Redux:', categories);
console.log('Selected Category:', selectedCategory);
console.log('Search Query:', searchQuery);

  return (
    <div className="min-h-screen">
      {/* Hero Banner with Parallax */}
      <section
        className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-[#0A0A0A] mt-16"
        data-testid="hero-banner"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${currentHeroImage})`,
            backgroundAttachment: 'fixed',
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 text-center px-6 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6">
            ELEVATE YOUR STYLE
          </h1>
          <p className="text-base sm:text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Discover premium electronics and fashion curated for the modern lifestyle
          </p>
          <button
            className="bg-[#F97316] text-white hover:bg-[#EA580C] px-8 py-4 font-semibold rounded-none tracking-wide transition-colors uppercase text-sm active:scale-95"
            data-testid="hero-cta"
            onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-16 px-6 bg-[#0A0A0A] border-b border-white/10" data-testid="benefits-section">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-[#171717] flex items-center justify-center border border-white/10">
              <FiTruck size={32} className="text-[#F97316]" />
            </div>
            <h3 className="text-white font-bold text-lg">FREE SHIPPING</h3>
            <p className="text-[#A3A3A3] text-sm">On all orders over $50</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-[#171717] flex items-center justify-center border border-white/10">
              <FiRefreshCw size={32} className="text-[#F97316]" />
            </div>
            <h3 className="text-white font-bold text-lg">FREE RETURNS</h3>
            <p className="text-[#A3A3A3] text-sm">30-day return policy</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-[#171717] flex items-center justify-center border border-white/10">
              <FiHeadphones size={32} className="text-[#F97316]" />
            </div>
            <h3 className="text-white font-bold text-lg">24/7 SUPPORT</h3>
            <p className="text-[#A3A3A3] text-sm">Always here to help</p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white mb-4">
              SHOP OUR COLLECTION
            </h2>
            <p className="text-[#A3A3A3] text-base">Browse through our curated selection</p>
          </div>

          {/* Category Filter */}
          <CategoryFilter categories={categories} />

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20" data-testid="loading-spinner">
              <div className="w-12 h-12 border-4 border-[#F97316] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20" data-testid="no-products">
              <p className="text-[#A3A3A3] text-lg">No products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="products-grid">
              {filteredProducts.map(product => (
            <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;