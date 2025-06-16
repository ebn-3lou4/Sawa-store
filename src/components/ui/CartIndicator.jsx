import React, { useState, useRef } from 'react';
import formatCurrency from '../../utils/formatCurrency';
import { useShop } from '../../context/ShopContext';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

function CartIndicator() {
  const { cart: cartItems } = useShop();
  const [showPreview, setShowPreview] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovered(true);
    setShowPreview(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    timeoutRef.current = setTimeout(() => {
      if (!isHovered) {
        setShowPreview(false);
      }
    }, 150);
  };

  const handlePreviewMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovered(true);
  };

  const handlePreviewMouseLeave = () => {
    setIsHovered(false);
    timeoutRef.current = setTimeout(() => {
      setShowPreview(false);
    }, 150);
  };

  // clear timeout on unmount
  React.useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div className="relative">
      <Link
        to="/shopping-cart-checkout"
        className="relative p-2 rounded-md text-text-secondary hover:text-primary hover:bg-surface transition-colors duration-150 min-w-touch min-h-touch flex items-center justify-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Icon name="ShoppingCart" size={20} />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
            {totalItems > 99 ? '99+' : totalItems}
          </span>
        )}
      </Link>

      {/* Desktop Cart Preview */}
      {showPreview && totalItems > 0 && (
        <div
          className="hidden lg:block absolute top-full right-0 mt-2 w-80 bg-background border border-border rounded-md shadow-modal z-dropdown"
          onMouseEnter={handlePreviewMouseEnter}
          onMouseLeave={handlePreviewMouseLeave}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-text-primary">Shopping Cart</h3>
              <span className="text-xs text-text-secondary">{totalItems} items</span>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-surface rounded-md flex items-center justify-center overflow-hidden">
                    <Icon name="Package" size={20} className="text-text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-text-secondary">
                      Qty: {item.quantity} × {formatCurrency(item.price)}
                    </p>
                  </div>
                  <div className="text-sm font-medium text-text-primary font-mono">
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border-light mt-4 pt-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-text-primary">Total:</span>
                <span className="text-lg font-bold text-primary font-mono">
                  {formatCurrency(totalPrice)}
                </span>
              </div>
              <Link
                to="/shopping-cart-checkout"
                className="w-full bg-primary text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors duration-150 flex items-center justify-center space-x-2"
              >
                <span>View Cart</span>
                <Icon name="ArrowRight" size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartIndicator;