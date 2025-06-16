import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

function QuickActions() {
  const quickActions = [
    {
      id: 'track-order',
      title: 'Track Order',
      description: 'Check your order status',
      icon: 'Package',
      color: 'bg-primary-50 text-primary',
      link: '/order-confirmation-tracking'
    },
    {
      id: 'browse-products',
      title: 'Browse Products',
      description: 'Discover new items',
      icon: 'Search',
      color: 'bg-success-50 text-success-600',
      link: '/product-catalog-browse'
    },
    {
      id: 'view-cart',
      title: 'View Cart',
      description: 'Review your items',
      icon: 'ShoppingCart',
      color: 'bg-accent-50 text-accent-600',
      link: '/shopping-cart-checkout'
    },
    {
      id: 'customer-support',
      title: 'Customer Support',
      description: 'Get help & support',
      icon: 'HelpCircle',
      color: 'bg-secondary-50 text-secondary-600',
      link: '#'
    },
    {
      id: 'returns',
      title: 'Returns & Refunds',
      description: 'Manage returns',
      icon: 'RotateCcw',
      color: 'bg-warning-50 text-warning-600',
      link: '#'
    },
    {
      id: 'gift-cards',
      title: 'Gift Cards',
      description: 'Buy or redeem',
      icon: 'Gift',
      color: 'bg-error-50 text-error-600',
      link: '#'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-text-primary">Quick Actions</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {quickActions.map((action) => (
          <Link
            key={action.id}
            to={action.link}
            className="group p-4 bg-surface border border-border rounded-lg hover:shadow-subtle hover:scale-105 transition-all duration-150 text-center"
          >
            <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-150`}>
              <Icon name={action.icon} size={24} />
            </div>
            <h4 className="font-medium text-text-primary text-sm mb-1 group-hover:text-primary transition-colors duration-150">
              {action.title}
            </h4>
            <p className="text-xs text-text-secondary">
              {action.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;