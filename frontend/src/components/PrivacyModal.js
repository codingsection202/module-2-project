/**
 * PrivacyModal Component
 * ======================
 * Reusable modal dialog for displaying legal content (Privacy Policy or Terms & Conditions).
 * Renders as a full-screen overlay with a centered content panel.
 * Content is defined statically within the component for each legal document type.
 * Supports closing via backdrop click, X button, or \"Accept & Close\" button.
 */


import { useState } from 'react';
import { FiX } from 'react-icons/fi';

const PrivacyModal = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const content = {
    privacy: {
      title: 'Privacy Policy',
      sections: [
        {
          heading: 'Information We Collect',
          content: 'We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This may include your name, email address, shipping address, and payment information.'
        },
        {
          heading: 'How We Use Your Information',
          content: 'We use the information we collect to process your orders, communicate with you, improve our services, and provide you with relevant product recommendations and promotional offers.'
        },
        {
          heading: 'Data Security',
          content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.'
        },
        {
          heading: 'Cookies',
          content: 'We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content.'
        }
      ]
    },
    terms: {
      title: 'Terms & Conditions',
      sections: [
        {
          heading: 'Acceptance of Terms',
          content: 'By accessing and using NexaStore, you accept and agree to be bound by the terms and provision of this agreement.'
        },
        {
          heading: 'Products and Pricing',
          content: 'All products are subject to availability. Prices are subject to change without notice. We reserve the right to limit quantities and refuse service.'
        },
        {
          heading: 'Returns and Refunds',
          content: 'We offer a 30-day return policy on most items. Products must be returned in original condition with all tags attached. Refunds will be processed within 7-10 business days.'
        },
        {
          heading: 'Shipping',
          content: 'Free shipping is available on orders over $50. Standard delivery takes 5-7 business days. We are not responsible for delays caused by shipping carriers.'
        },
        {
          heading: 'Limitation of Liability',
          content: 'NexaStore shall not be liable for any indirect, incidental, special, or consequential damages arising out of or related to your use of our services.'
        }
      ]
    }
  };

  const data = content[type] || content.privacy;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" data-testid={`${type}-modal`}>
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="relative bg-[#171717] border border-white/10 shadow-2xl p-8 max-w-2xl w-full mx-auto max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black tracking-tight text-white uppercase">
            {data.title}
          </h2>
          <button
            onClick={onClose}
            className="text-[#A3A3A3] hover:text-white transition-colors"
            data-testid={`close-${type}-modal`}
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {data.sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-bold text-lg mb-2">{section.heading}</h3>
              <p className="text-[#A3A3A3] text-sm leading-relaxed">{section.content}</p>
            </div>
          ))}

          <div className="border-t border-white/10 pt-6">
            <p className="text-[#A3A3A3] text-xs">
              Last updated: March 2026
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8">
          <button
            onClick={onClose}
            className="w-full bg-[#F97316] text-white hover:bg-[#EA580C] px-6 py-3 font-semibold rounded-none tracking-wide transition-colors uppercase text-sm"
            data-testid={`accept-${type}-btn`}
          >
            Accept & Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;