import React from 'react';
import Icon from '../../../components/AppIcon';

function ProductInfo({
  product,
  selectedVariant,
  setSelectedVariant,
  quantity,
  setQuantity,
  isWishlisted,
  onWishlistToggle,
  onAddToCart
}) {
  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (selectedVariant?.stock || 0)) {
      setQuantity(newQuantity);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={16} className="text-accent fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="Star" size={16} className="text-accent fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={16} className="text-secondary-300" />
      );
    }

    return stars;
  };

  return (
    <div className="space-y-6">
      {/* Brand and Product Name */}
      <div>
        <p className="text-sm text-text-secondary mb-1">{product.brand}</p>
        <h1 className="text-2xl lg:text-3xl font-bold text-text-primary leading-tight">
          {product.name}
        </h1>
      </div>

      {/* Rating and Reviews */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          {renderStars(product.rating)}
        </div>
        <span className="text-sm text-text-secondary">
          {product.rating} ({product.reviewCount.toLocaleString()} reviews)
        </span>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <span className="text-3xl font-bold text-primary font-mono">
            ${selectedVariant?.price?.toFixed(2) || product.price.toFixed(2)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xl text-text-secondary line-through font-mono">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
          {product.discount > 0 && (
            <span className="bg-error text-white px-2 py-1 rounded text-sm font-medium">
              -{product.discount}%
            </span>
          )}
        </div>
        {product.originalPrice > product.price && (
          <p className="text-sm text-success">
            You save ${(product.originalPrice - product.price).toFixed(2)}
          </p>
        )}
      </div>

      {/* Availability */}
      <div className="flex items-center space-x-2">
        <Icon 
          name={selectedVariant?.stock > 0 ? "CheckCircle" : "XCircle"} 
          size={20} 
          className={selectedVariant?.stock > 0 ? "text-success" : "text-error"} 
        />
        <span className={`font-medium ${
          selectedVariant?.stock > 0 ? "text-success" : "text-error"
        }`}>
          {selectedVariant?.stock > 0 ? product.availability : "Out of Stock"}
        </span>
        {selectedVariant?.stock > 0 && selectedVariant.stock <= 5 && (
          <span className="text-warning text-sm">
            Only {selectedVariant.stock} left!
          </span>
        )}
      </div>

      {/* Color Variants */}
      {product.variants && product.variants.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-text-primary">
            Color: {selectedVariant?.name}
          </h3>
          <div className="flex items-center space-x-3">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant)}
                className={`relative w-10 h-10 rounded-full border-2 transition-all duration-150 ${
                  selectedVariant?.id === variant.id
                    ? 'border-primary shadow-md scale-110'
                    : 'border-secondary-300 hover:border-secondary-400'
                }`}
                style={{ backgroundColor: variant.value }}
                title={variant.name}
              >
                {selectedVariant?.id === variant.id && (
                  <Icon 
                    name="Check" 
                    size={16} 
                    className={`absolute inset-0 m-auto ${
                      variant.value === '#FFFFFF' ? 'text-text-primary' : 'text-white'
                    }`} 
                  />
                )}
                {variant.stock === 0 && (
                  <div className="absolute inset-0 bg-background bg-opacity-50 rounded-full flex items-center justify-center">
                    <Icon name="X" size={16} className="text-error" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-text-primary">Quantity</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-border rounded-md">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            >
              <Icon name="Minus" size={16} />
            </button>
            <span className="w-12 text-center font-medium text-text-primary">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= (selectedVariant?.stock || 0)}
              className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            >
              <Icon name="Plus" size={16} />
            </button>
          </div>
          <span className="text-sm text-text-secondary">
            {selectedVariant?.stock || 0} available
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <div className="flex space-x-4">
          <button
            onClick={onAddToCart}
            disabled={!selectedVariant || selectedVariant.stock === 0}
            className="flex-1 bg-primary text-white py-3 px-6 rounded-md font-medium hover:bg-primary-700 disabled:bg-secondary-300 disabled:cursor-not-allowed transition-colors duration-150 flex items-center justify-center space-x-2"
          >
            <Icon name="ShoppingCart" size={20} />
            <span>Add to Cart</span>
          </button>
          <button
            onClick={onWishlistToggle}
            className={`p-3 rounded-md border transition-colors duration-150 ${
              isWishlisted
                ? 'border-error bg-error-50 text-error hover:bg-error-100' :'border-border hover:bg-surface text-text-secondary hover:text-primary'
            }`}
          >
            <Icon 
              name="Heart" 
              size={20} 
              className={isWishlisted ? "fill-current" : ""} 
            />
          </button>
        </div>

        <button className="w-full bg-accent text-white py-3 px-6 rounded-md font-medium hover:bg-accent-600 transition-colors duration-150 flex items-center justify-center space-x-2">
          <Icon name="Zap" size={20} />
          <span>Buy Now</span>
        </button>
      </div>

      {/* Product Features */}
      <div className="border-t border-border pt-6">
        <h3 className="text-sm font-semibold text-text-primary mb-3">Key Features</h3>
        <ul className="space-y-2">
          {product.features.slice(0, 4).map((feature, index) => (
            <li key={index} className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="Check" size={16} className="text-success flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Shipping Info */}
      <div className="border-t border-border pt-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Icon name="Truck" size={16} className="text-success" />
            <span className="text-sm text-text-primary">
              {product.shipping.freeShipping ? 'Free Shipping' : 'Shipping Available'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">
              Estimated delivery: {product.shipping.estimatedDelivery}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="RotateCcw" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">
              {product.shipping.returnPolicy}
            </span>
          </div>
        </div>
      </div>

      {/* Social Sharing */}
      <div className="border-t border-border pt-6">
        <h3 className="text-sm font-semibold text-text-primary mb-3">Share</h3>
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-md bg-surface hover:bg-secondary-100 text-text-secondary hover:text-primary transition-colors duration-150">
            <Icon name="Facebook" size={18} />
          </button>
          <button className="p-2 rounded-md bg-surface hover:bg-secondary-100 text-text-secondary hover:text-primary transition-colors duration-150">
            <Icon name="Twitter" size={18} />
          </button>
          <button className="p-2 rounded-md bg-surface hover:bg-secondary-100 text-text-secondary hover:text-primary transition-colors duration-150">
            <Icon name="Share2" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;