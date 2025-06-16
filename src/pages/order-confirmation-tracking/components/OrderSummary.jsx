import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import formatCurrency from '../../../utils/formatCurrency';

function OrderSummary({ items, orderDate, orderNumber }) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary flex items-center">
          <Icon name="Package" size={24} className="mr-2 text-primary" />
          Order Summary
        </h2>
        <div className="text-right">
          <p className="text-sm text-text-secondary">Order Date</p>
          <p className="font-medium text-text-primary">{formatDate(orderDate)}</p>
        </div>
      </div>

      {/* Order Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 p-4 bg-surface rounded-lg">
            <div className="w-16 h-16 bg-background rounded-md overflow-hidden flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-text-primary truncate">{item.name}</h3>
              <p className="text-sm text-text-secondary">{item.variant}</p>
              <p className="text-sm text-text-secondary">Qty: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-text-primary font-mono">
                {formatCurrency(item.price * item.quantity)}
              </p>
              <p className="text-sm text-text-secondary">
                {formatCurrency(item.price)} each
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Order Totals */}
      <div className="border-t border-border-light pt-4">
        <div className="space-y-2">
          <div className="flex justify-between text-text-secondary">
            <span>Subtotal</span>
            <span className="font-mono">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-text-secondary">
            <span>Shipping</span>
            <span className="font-mono">{formatCurrency(shipping)}</span>
          </div>
          <div className="flex justify-between text-text-secondary">
            <span>Tax</span>
            <span className="font-mono">{formatCurrency(tax)}</span>
          </div>
          <div className="border-t border-border-light pt-2 mt-2">
            <div className="flex justify-between text-lg font-bold text-text-primary">
              <span>Total</span>
              <span className="font-mono">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;