import React from 'react';
import Icon from '../../../components/AppIcon';

function ShippingOptions({ selectedShipping, onShippingSelect }) {
  const shippingOptions = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      description: 'Delivery in 5-7 business days',
      cost: 0,
      icon: 'Package',
      estimatedDays: '5-7 days'
    },
    {
      id: 'express',
      name: 'Express Shipping',
      description: 'Delivery in 2-3 business days',
      cost: 9.99,
      icon: 'Zap',
      estimatedDays: '2-3 days'
    },
    {
      id: 'overnight',
      name: 'Overnight Shipping',
      description: 'Next business day delivery',
      cost: 24.99,
      icon: 'Clock',
      estimatedDays: '1 day'
    }
  ];

  const formatPrice = (price) => {
    return price === 0 ? 'Free' : `$${price.toFixed(2)}`;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-text-primary">Shipping Options</h3>
      
      <div className="space-y-3">
        {shippingOptions.map((option) => (
          <div
            key={option.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all duration-150 ${
              selectedShipping?.id === option.id
                ? 'border-primary bg-primary-50 shadow-subtle'
                : 'border-border hover:border-secondary-300 hover:shadow-subtle'
            }`}
            onClick={() => onShippingSelect(option)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  selectedShipping?.id === option.id
                    ? 'bg-primary text-white' :'bg-secondary-100 text-text-secondary'
                }`}>
                  <Icon name={option.icon} size={20} />
                </div>
                
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-text-primary">{option.name}</h4>
                    <span className={`text-sm font-medium font-mono ${
                      option.cost === 0 ? 'text-success-600' : 'text-text-primary'
                    }`}>
                      {formatPrice(option.cost)}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary">{option.description}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-text-primary">
                    {option.estimatedDays}
                  </div>
                  <div className="text-xs text-text-secondary">
                    Estimated delivery
                  </div>
                </div>
                
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedShipping?.id === option.id
                    ? 'border-primary bg-primary' :'border-secondary-300'
                }`}>
                  {selectedShipping?.id === option.id && (
                    <Icon name="Check" size={12} color="white" />
                  )}
                </div>
              </div>
            </div>

            {/* Additional Info for Selected Option */}
            {selectedShipping?.id === option.id && (
              <div className="mt-3 pt-3 border-t border-primary-200">
                <div className="flex items-center space-x-2 text-sm text-primary">
                  <Icon name="Info" size={16} />
                  <span>
                    {option.id === 'standard' && 'Free shipping on orders over $50'}
                    {option.id === 'express' && 'Tracking included with express delivery'}
                    {option.id === 'overnight' && 'Order by 2 PM for next-day delivery'}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Shipping Info */}
      <div className="bg-secondary-50 rounded-lg p-4 mt-6">
        <div className="flex items-start space-x-3">
          <Icon name="Truck" size={20} className="text-secondary-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-text-primary mb-1">Shipping Information</h4>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• All orders are processed within 1-2 business days</li>
              <li>• Delivery times exclude weekends and holidays</li>
              <li>• Tracking information will be provided via email</li>
              <li>• Signature may be required for high-value items</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShippingOptions;