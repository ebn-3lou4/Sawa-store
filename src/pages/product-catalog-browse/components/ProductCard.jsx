import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import { useShop } from "../../../context/ShopContext";

export default function ProductCard({ product, onQuickAdd }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { wishlist, addToWishlist, removeFromWishlist } = useShop();
  const isFavorite = wishlist.some((item) => item.id === product.id);

  // Helper object for color mapping
  const colorMap = {
    black: "#000000",
    white: "#ffffff",
    gray: "#6b7280",
    blue: "#3b82f6",
    orange: "#f97316",
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

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickAdd(product);
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
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
          size={12}
          className="text-accent fill-current"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon
          key="half"
          name="Star"
          size={12}
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
          size={12}
          className="text-secondary-300"
        />
      );
    }

    return stars;
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative bg-background border border-border rounded-xl overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300 block focus:outline-none focus:ring-0 active:scale-100 active:shadow-none"
    >
      {/* Product Image */}
      <div className="aspect-square relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
        />
        {/* Sale/New Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          {product.isNew && (
            <span className="bg-success text-white text-xs font-semibold px-2.5 py-1 rounded-md">
              New
            </span>
          )}
          {product.isSale && (
            <span className="bg-error text-white text-xs font-semibold px-2.5 py-1 rounded-md">
              Sale
            </span>
          )}
        </div>
        {/* Favorite Button */}
        <div className="absolute top-4 right-4 z-20 group/fav">
          <button
            onClick={handleToggleFavorite}
            className={`p-2 rounded-full bg-white shadow-md border border-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 flex items-center justify-center
              ${
                isFavorite
                  ? "text-error scale-110"
                  : "text-gray-400 hover:text-error hover:scale-110"
              }
            `}
            aria-label={isFavorite ? "إزالة من المفضلة" : "أضف إلى المفضلة"}
          >
            <Icon
              name="Heart"
              size={22}
              color={isFavorite ? "#ef4444" : undefined}
              fill={isFavorite ? "#ef4444" : "none"}
            />
          </button>
          <span className="absolute right-1/2 translate-x-1/2 mt-2 px-2 py-1 rounded bg-black/80 text-xs text-white opacity-0 group-hover/fav:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            {isFavorite ? "إزالة من المفضلة" : "أضف إلى المفضلة"}
          </span>
        </div>
        {/* Quick Add Button */}
        <button
          onClick={handleQuickAdd}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-6 py-2.5 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-primary-700"
        >
          Quick Add
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-text-primary mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-text-secondary text-sm mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-primary">
              EGP {product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-text-secondary line-through">
                EGP {product.originalPrice}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={16} className="text-yellow-400" />
            <span className="text-sm text-text-secondary">
              {product.rating}
            </span>
          </div>
        </div>

        {/* Color Options */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {product.colors.map((color) => (
              <span
                key={color}
                className={`w-4 h-4 rounded-full border-2 border-transparent transition-all duration-150 ${
                  color.toLowerCase() === "white" ? "border-gray-300" : ""
                }`}
                style={{ backgroundColor: getColorHex(color) }}
                title={color}
              ></span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
