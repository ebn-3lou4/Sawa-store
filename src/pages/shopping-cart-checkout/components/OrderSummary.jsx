import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import formatCurrency from '../../../utils/formatCurrency';

function OrderSummary({
  subtotal,
  discountAmount,
  appliedDiscount,
  shippingCost,
  taxAmount,
  total,
  discountCode,
  onDiscountCodeChange,
  onApplyDiscount,
  onRemoveDiscount,
  currentStep
}) {
  const [isDiscountExpanded, setIsDiscountExpanded] = useState(false);



  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Order Summary</h3>

      <div className="space-y-3">
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <span className="text-text-secondary">Subtotal</span>
          <span className="font-medium text-text-primary font-mono">
            {formatCurrency(subtotal)}
          </span>
        </div>

        {/* Discount */}
        {appliedDiscount && (
          <div className="flex justify-between items-center text-success-600">
            <div className="flex items-center space-x-2">
              <span>Discount ({appliedDiscount.code})</span>
              <button
                onClick={onRemoveDiscount}
                className="text-text-secondary hover:text-error transition-colors duration-150"
                title="Remove discount"
              >
                <Icon name="X" size={14} />
              </button>
            </div>
            <span className="font-medium font-mono">
              -{formatCurrency(discountAmount)}
            </span>
          </div>
        )}

        {/* Shipping */}
        {currentStep >= 2 && (
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Shipping</span>
            <span className="font-medium text-text-primary font-mono">
              {shippingCost === 0 ? 'Free' : formatCurrency(shippingCost)}
            </span>
          </div>
        )}

        {/* Tax */}
        {currentStep >= 2 && (
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Tax (8%)</span>
            <span className="font-medium text-text-primary font-mono">
              {formatCurrency(taxAmount)}
            </span>
          </div>
        )}

        {/* Discount Code Section */}
        {!appliedDiscount && (
          <div className="pt-3 border-t border-border-light">
            <button
              onClick={() => setIsDiscountExpanded(!isDiscountExpanded)}
              className="flex items-center justify-between w-full text-sm text-primary hover:text-primary-700 transition-colors duration-150"
            >
              <span>Have a discount code?</span>
              <Icon 
                name={isDiscountExpanded ? 'ChevronUp' : 'ChevronDown'} 
                size={16} 
              />
            </button>

            {isDiscountExpanded && (
              <div className="mt-3 space-y-2">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => onDiscountCodeChange(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <button
                    onClick={onApplyDiscount}
                    disabled={!discountCode.trim()}
                    className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary-700 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Apply
                  </button>
                </div>
                <div className="text-xs text-text-secondary">
                  <p>Try: SAVE10, WELCOME20, or FREESHIP</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Total */}
        <div className="pt-4 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-text-primary">Total</span>
            <span className="text-xl font-bold text-primary font-mono">
              {formatCurrency(total)}
            </span>
          </div>
        </div>

        {/* Security Badges */}
        <div className="pt-4 border-t border-border-light">
          <div className="flex items-center justify-center space-x-4 text-xs text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Shield" size={14} className="text-success-600" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Lock" size={14} className="text-success-600" />
              <span>Safe Checkout</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="pt-3">
          <p className="text-xs text-text-secondary text-center mb-2">We accept</p>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-8 h-5 bg-secondary-200 rounded flex items-center justify-center">
              <Icon name="CreditCard" size={12} className="text-text-secondary" />
            </div>
            <div className="w-8 h-5 bg-secondary-200 rounded flex items-center justify-center">
              <span className="text-xs font-bold text-text-secondary">PP</span>
            </div>
            <div className="w-8 h-5 bg-secondary-200 rounded flex items-center justify-center">
              <Icon name="Smartphone" size={12} className="text-text-secondary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;