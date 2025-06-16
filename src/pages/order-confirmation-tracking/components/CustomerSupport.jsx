import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

function CustomerSupport({ orderNumber }) {
  const [supportExpanded, setSupportExpanded] = useState(false);

  const supportOptions = [
    {
      title: 'Live Chat',
      description: 'Chat with our support team',
      icon: 'MessageCircle',
      action: () => {
        // Mock chat functionality
        alert('Live chat would open here');
      },
      available: true
    },
    {
      title: 'Email Support',
      description: 'Send us an email',
      icon: 'Mail',
      action: () => {
        window.location.href = `mailto:support@shophub.com?subject=Order ${orderNumber} - Support Request`;
      },
      available: true
    },
    {
      title: 'Phone Support',
      description: 'Call us at 1-800-SHOP-HUB',
      icon: 'Phone',
      action: () => {
        window.location.href = 'tel:+18007467482';
      },
      available: true
    }
  ];

  const faqItems = [
    {
      question: 'How can I track my order?',
      answer: 'You can track your order using the tracking number provided above or by visiting your account dashboard.'
    },
    {
      question: 'Can I change my delivery address?',
      answer: 'If your order hasn\'t shipped yet, you may be able to change the delivery address. Please contact support immediately.'
    },
    {
      question: 'What if my package is damaged?',
      answer: 'If your package arrives damaged, please contact us within 48 hours with photos of the damage for a quick resolution.'
    }
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary flex items-center">
          <Icon name="HelpCircle" size={20} className="mr-2 text-primary" />
          Need Help?
        </h3>
        <button
          onClick={() => setSupportExpanded(!supportExpanded)}
          className="text-primary hover:text-primary-700 text-sm font-medium"
        >
          {supportExpanded ? 'Less' : 'More'}
        </button>
      </div>

      {/* Quick Support Options */}
      <div className="space-y-3 mb-4">
        {supportOptions.slice(0, supportExpanded ? supportOptions.length : 2).map((option) => (
          <button
            key={option.title}
            onClick={option.action}
            disabled={!option.available}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors duration-150 ${
              option.available
                ? 'bg-surface hover:bg-secondary-100 text-text-primary' :'bg-secondary-50 text-text-secondary cursor-not-allowed'
            }`}
          >
            <Icon name={option.icon} size={18} className="text-primary" />
            <div className="flex-1">
              <p className="font-medium">{option.title}</p>
              <p className="text-sm text-text-secondary">{option.description}</p>
            </div>
            <Icon name="ArrowRight" size={16} className="text-text-secondary" />
          </button>
        ))}
      </div>

      {/* FAQ Section */}
      {supportExpanded && (
        <div className="border-t border-border-light pt-4">
          <h4 className="font-medium text-text-primary mb-3">Frequently Asked Questions</h4>
          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <details key={index} className="group">
                <summary className="flex justify-between items-center cursor-pointer p-3 rounded-lg bg-surface hover:bg-secondary-50">
                  <span className="font-medium">{item.question}</span>
                  <Icon name="ChevronDown" size={16} className="text-text-secondary transform group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-2 p-3 text-text-secondary text-sm">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerSupport;