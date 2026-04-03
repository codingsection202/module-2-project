/**
 * Footer Component
 * ================
 * Site-wide footer with four columns:
 * - Brand info and social media links
 * - Quick navigation links
 * - Customer service information
 * - Newsletter subscription form
 * Also includes Privacy Policy and Terms & Conditions modal triggers.
 */


import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';
import PrivacyModal from './PrivacyModal';

const Footer = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  return (
    <>
      <PrivacyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} type="privacy" />
      <PrivacyModal isOpen={showTerms} onClose={() => setShowTerms(false)} type="terms" />
      <footer className="bg-[#050505] border-t border-white/10 py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[#F97316] flex items-center justify-center">
                <span className="text-white font-black text-xl">N</span>
              </div>
              <span className="text-xl font-black tracking-tight text-white">NexaStore</span>
            </div>
            <p className="text-[#A3A3A3] text-sm leading-relaxed">
              Your premium destination for electronics and fashion. Discover the latest trends and cutting-edge technology.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#A3A3A3] hover:text-[#F97316] transition-colors" data-testid="social-facebook">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-[#A3A3A3] hover:text-[#F97316] transition-colors" data-testid="social-twitter">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-[#A3A3A3] hover:text-[#F97316] transition-colors" data-testid="social-instagram">
                <FiInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-[#A3A3A3] hover:text-white transition-colors text-sm" data-testid="footer-home">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/" className="text-[#A3A3A3] hover:text-white transition-colors text-sm" data-testid="footer-shop">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-[#A3A3A3] hover:text-white transition-colors text-sm" data-testid="footer-cart">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-[#A3A3A3] hover:text-white transition-colors text-sm" data-testid="footer-wishlist">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li className="text-[#A3A3A3] text-sm">Free Shipping on orders over $50</li>
              <li className="text-[#A3A3A3] text-sm">30-day return policy</li>
              <li className="text-[#A3A3A3] text-sm">24/7 Customer Support</li>
              <li className="text-[#A3A3A3] text-sm">Secure Payment</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-4">Newsletter</h3>
            <p className="text-[#A3A3A3] text-sm mb-4">
              Subscribe to get special offers and updates.
            </p>
            <form className="flex flex-col space-y-2" data-testid="newsletter-form">
              <input
                type="email"
                placeholder="Your email"
                className="bg-[#171717] border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-[#F97316] focus:border-[#F97316] px-4 py-2 rounded-none placeholder-[#A3A3A3] w-full text-sm"
                data-testid="newsletter-input"
              />
              <button
                type="submit"
                className="bg-[#F97316] text-white hover:bg-[#EA580C] px-4 py-2 font-semibold rounded-none tracking-wide transition-colors uppercase text-xs"
                data-testid="newsletter-submit"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-[#A3A3A3] text-sm">
            © 2026 NexaStore. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <button 
              onClick={() => setShowPrivacy(true)}
              className="text-[#A3A3A3] hover:text-white transition-colors text-sm" 
              data-testid="footer-privacy"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => setShowTerms(true)}
              className="text-[#A3A3A3] hover:text-white transition-colors text-sm" 
              data-testid="footer-terms"
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;