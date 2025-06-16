import React, { useState, useEffect } from "react";
import { useShop } from "../../../context/ShopContext";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

function QuickAddModal({ product, onClose }) {
  const { addToCart } = useShop();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Helper object for color mapping
  const colorMap = {
    black: "#000000",
    white: "#ffffff",
    gray: "#6b7280", // Tailwind's gray-500
    blue: "#3b82f6", // Tailwind's blue-500
    orange: "#f97316", // Tailwind's orange-500
    red: "#ef4444",
    green: "#22c55e",
    purple: "#8b5cf6",
    pink: "#ec4899",
    brown: "#92400e",
    tan: "#d2b48c",
    silver: "#9ca3af",
    "rose gold": "#f59e0b",
    navy: "#1e3a8a",
  };

  const getColorHex = (colorName) => {
    return colorMap[colorName.toLowerCase()] || "#6b7280"; // Default to gray if not found
  };

  useEffect(() => {
    // Set default selections
    if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
    if (product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }

    // Prevent body scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [product]);

  const handleAddToCart = async () => {
    // add to cart immediately
    addToCart({ ...product, selectedSize, selectedColor }, quantity);

    setIsAdding(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsAdding(false);
    setShowSuccess(true);

    // Auto close after success animation
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  const canAddToCart = () => {
    if (product.sizes && product.sizes.length > 1 && !selectedSize)
      return false;
    if (product.colors && product.colors.length > 1 && !selectedColor)
      return false;
    return product.inStock;
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon
          key={i}
          name="Star"
          size={14}
          className="text-accent fill-current"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon
          key="half"
          name="Star"
          size={14}
          className="text-accent fill-current opacity-50"
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon
          key={`empty-${i}`}
          name="Star"
          size={14}
          className="text-secondary-300"
        />
      );
    }

    return stars;
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-modal flex items-center justify-center p-4">
        <div className="bg-background rounded-lg p-8 max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Check" size={32} className="text-success" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            Added to Cart!
          </h3>
          <p className="text-text-secondary">
            {product.name} has been added to your cart.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-modal flex items-center justify-center p-4">
      <div className="bg-background rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border-light">
          <h2 className="text-lg font-semibold text-text-primary">Quick Add</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-text-secondary hover:text-primary hover:bg-surface transition-colors duration-150"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="flex space-x-4 mb-4">
            <div className="w-20 h-20 bg-surface rounded-md overflow-hidden flex-shrink-0">
              <Image
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-text-primary mb-1 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-sm text-text-secondary mb-2">
                {product.brand}
              </p>
              <div className="flex items-center space-x-1 mb-2">
                <div className="flex items-center space-x-0.5">
                  {renderStars(product.rating)}
                </div>
                <span className="text-xs text-text-secondary">
                  ({product.reviewCount})
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-text-primary font-mono">
                  EGP {product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-text-secondary line-through font-mono">
                    EGP {product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Size
              </label>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-2 text-sm font-medium border rounded-md transition-colors duration-150 ${
                      selectedSize === size
                        ? "bg-primary text-white border-primary"
                        : "bg-background text-text-secondary border-border hover:border-primary"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Color
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-150 ${
                      selectedColor === color
                        ? "border-primary ring-2 ring-primary ring-opacity-50"
                        : "border-transparent"
                    } ${
                      color.toLowerCase() === "white" ? "border-gray-300" : ""
                    }`}
                    style={{ backgroundColor: getColorHex(color) }}
                    title={color}
                  >
                    {selectedColor === color && (
                      <Icon
                        name="Check"
                        size={16}
                        className="text-white drop-shadow-sm"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Quantity
            </label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="w-10 h-10 rounded-md border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon name="Minus" size={16} />
              </button>
              <span className="text-lg font-medium text-text-primary min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-md border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-colors duration-150"
              >
                <Icon name="Plus" size={16} />
              </button>
            </div>
          </div>

          {/* Stock Status */}
          <div className="mb-4">
            <span
              className={`text-sm font-medium ${
                product.inStock ? "text-success" : "text-error"
              }`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!canAddToCart() || isAdding}
            className="w-full bg-primary text-white py-3 px-4 rounded-md font-medium hover:bg-primary-700 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isAdding ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Adding...</span>
              </>
            ) : (
              <>
                <Icon name="ShoppingCart" size={20} />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuickAddModal;
