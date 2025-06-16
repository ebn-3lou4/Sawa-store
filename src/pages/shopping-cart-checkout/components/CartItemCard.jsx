import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import formatCurrency from '../../../utils/formatCurrency';

function CartItemCard({ item, onQuantityUpdate, onRemove, isLoading, layout = 'card' }) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 0) return;
    setQuantity(newQuantity);
    onQuantityUpdate(item.id, newQuantity);
  };



  if (layout === 'table') {
    return (
      <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-surface transition-colors duration-150">
        {/* Product Info */}
        <div className="col-span-6 flex items-center space-x-4">
          <div className="w-16 h-16 bg-secondary-100 rounded-md overflow-hidden flex-shrink-0">
            <Image
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-text-primary truncate">{item.name}</h3>
            <p className="text-sm text-text-secondary">{item.brand}</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {item.variant && Object.entries(item.variant).map(([key, value]) => (
                <span key={key} className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded">
                  {key}: {value}
                </span>
              ))}
            </div>
            {item.originalPrice > item.price && (
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-sm text-text-secondary line-through">
                  {formatCurrency(item.originalPrice)}
                </span>
                <span className="text-xs bg-error-100 text-error-700 px-2 py-1 rounded">
                  Save {formatCurrency(item.originalPrice - item.price)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="col-span-2 flex items-center justify-center">
          <div className="flex items-center border border-border rounded-md">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={isLoading || quantity <= 1}
              className="p-2 hover:bg-surface transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="Minus" size={16} />
            </button>
            <span className="px-4 py-2 text-center min-w-[3rem] font-medium">
              {isLoading ? (
                <Icon name="Loader2" size={16} className="animate-spin mx-auto" />
              ) : (
                quantity
              )}
            </span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={isLoading}
              className="p-2 hover:bg-surface transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="Plus" size={16} />
            </button>
          </div>
        </div>

        {/* Unit Price */}
        <div className="col-span-2 text-center">
          <span className="font-medium text-text-primary font-mono">
            {formatCurrency(item.price)}
          </span>
        </div>

        {/* Total Price */}
        <div className="col-span-2 flex items-center justify-between">
          <span className="font-bold text-text-primary font-mono">
            {formatCurrency(item.price * quantity)}
          </span>
          <button
            onClick={() => onRemove(item.id)}
            className="p-1 text-text-secondary hover:text-error transition-colors duration-150 ml-2"
            title="Remove item"
          >
            <Icon name="Trash2" size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg border border-border p-4">
      <div className="flex space-x-4">
        {/* Product Image */}
        <div className="w-20 h-20 bg-secondary-100 rounded-md overflow-hidden flex-shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium text-text-primary">{item.name}</h3>
              <p className="text-sm text-text-secondary">{item.brand}</p>
            </div>
            <button
              onClick={() => onRemove(item.id)}
              className="p-1 text-text-secondary hover:text-error transition-colors duration-150"
              title="Remove item"
            >
              <Icon name="Trash2" size={16} />
            </button>
          </div>

          {/* Variants */}
          <div className="flex flex-wrap gap-2 mb-3">
            {item.variant && Object.entries(item.variant).map(([key, value]) => (
              <span key={key} className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded">
                {key}: {value}
              </span>
            ))}
          </div>

          {/* Price and Quantity */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-text-primary font-mono">
                {formatCurrency(item.price)}
              </span>
              {item.originalPrice > item.price && (
                <span className="text-sm text-text-secondary line-through">
                  {formatCurrency(item.originalPrice)}
                </span>
              )}
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center border border-border rounded-md">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={isLoading || quantity <= 1}
                className="p-2 hover:bg-background transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon name="Minus" size={14} />
              </button>
              <span className="px-3 py-2 text-center min-w-[2.5rem] font-medium text-sm">
                {isLoading ? (
                  <Icon name="Loader2" size={14} className="animate-spin mx-auto" />
                ) : (
                  quantity
                )}
              </span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={isLoading}
                className="p-2 hover:bg-background transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon name="Plus" size={14} />
              </button>
            </div>
          </div>

          {/* Savings Badge */}
          {item.originalPrice > item.price && (
            <div className="mt-2">
              <span className="text-xs bg-error-100 text-error-700 px-2 py-1 rounded">
                Save {formatCurrency(item.originalPrice - item.price)}
              </span>
            </div>
          )}

          {/* Total for this item */}
          <div className="mt-3 pt-3 border-t border-border-light">
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Item Total:</span>
              <span className="font-bold text-text-primary font-mono">
                {formatCurrency(item.price * quantity)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItemCard;