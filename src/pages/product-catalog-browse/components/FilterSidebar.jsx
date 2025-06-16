import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

export default function FilterSidebar({
  filters,
  onFilterChange,
  products = [],
  onClose,
}) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    color: true,
    rating: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFilterUpdate = (filterType, value, checked = null) => {
    const newFilters = { ...filters };

    switch (filterType) {
      case "category":
        newFilters.category = newFilters.category === value ? "" : value;
        break;
      case "priceRange":
        newFilters.priceRange = value;
        break;
      case "color":
        if (checked) {
          newFilters.colors = [...newFilters.colors, value];
        } else {
          newFilters.colors = newFilters.colors.filter(
            (color) => color !== value
          );
        }
        break;
      case "rating":
        newFilters.rating = newFilters.rating === value ? 0 : value;
        break;
      default:
        break;
    }

    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    onFilterChange({
      category: "",
      priceRange: [0, 1000],
      colors: [],
      rating: 0,
    });
  };

  // Get unique values from products with fallback to empty arrays
  const categories =
    products?.length > 0
      ? [...new Set(products.map((p) => p.category))]
      : [
          "All",
          "Electronics",
          "Clothing",
          "Books",
          "Home & Garden",
          "Sports",
          "Beauty",
          "Toys",
        ];

  const colors =
    products?.length > 0
      ? [...new Set(products.flatMap((p) => p.colors || []))]
      : ["Black", "White", "Red", "Blue", "Green", "Yellow", "Purple", "Pink"];

  const FilterSection = ({ title, sectionKey, children }) => (
    <div className="border-b border-border-light pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full text-left mb-3"
      >
        <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
        <Icon
          name="ChevronDown"
          size={16}
          className={`text-text-secondary transition-transform duration-150 ${
            expandedSections[sectionKey] ? "rotate-180" : ""
          }`}
        />
      </button>
      {expandedSections[sectionKey] && (
        <div className="space-y-2">{children}</div>
      )}
    </div>
  );

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name="Star"
          size={12}
          className={
            i <= rating ? "text-accent fill-current" : "text-secondary-300"
          }
        />
      );
    }
    return stars;
  };

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
        <button
          onClick={clearAllFilters}
          className="text-sm text-primary hover:text-primary-700 font-medium transition-colors duration-150"
        >
          Clear All
        </button>
      </div>

      {/* Category Filter */}
      <FilterSection title="Category" sectionKey="category">
        {categories.map((category) => (
          <label
            key={category}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <input
              type="radio"
              name="category"
              checked={filters.category === category}
              onChange={() => handleFilterUpdate("category", category)}
              className="w-4 h-4 text-primary border-border focus:ring-primary-500"
            />
            <span className="text-sm text-text-secondary capitalize">
              {category}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Price Range Filter */}
      <FilterSection title="Price Range" sectionKey="price">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-text-secondary">
            <span>EGP {filters.priceRange[0]}</span>
            <span>EGP {filters.priceRange[1]}</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={filters.priceRange[1]}
              onChange={(e) =>
                handleFilterUpdate("priceRange", [
                  filters.priceRange[0],
                  parseInt(e.target.value),
                ])
              }
              className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer slider [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 [&::-moz-range-track]:bg-secondary-200 [&::-moz-range-track]:rounded-lg [&::-moz-range-track]:h-2 [&::-moz-range-progress]:bg-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.priceRange[0]}
              onChange={(e) =>
                handleFilterUpdate("priceRange", [
                  parseInt(e.target.value) || 0,
                  filters.priceRange[1],
                ])
              }
              className="input-field text-sm py-2 focus:ring-primary focus:border-primary"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.priceRange[1]}
              onChange={(e) =>
                handleFilterUpdate("priceRange", [
                  filters.priceRange[0],
                  parseInt(e.target.value) || 1000,
                ])
              }
              className="input-field text-sm py-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
      </FilterSection>

      {/* Color Filter */}
      <FilterSection title="Color" sectionKey="color">
        <div className="grid grid-cols-2 gap-2">
          {colors.map((color) => (
            <label
              key={color}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.colors.includes(color)}
                onChange={(e) =>
                  handleFilterUpdate("color", color, e.target.checked)
                }
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
              />
              <div className="flex items-center space-x-2">
                <div
                  className="w-4 h-4 rounded-full border border-border-light"
                  style={{
                    backgroundColor:
                      color.toLowerCase() === "white"
                        ? "#ffffff"
                        : color.toLowerCase() === "black"
                        ? "#000000"
                        : color.toLowerCase() === "gray"
                        ? "#6b7280"
                        : color.toLowerCase() === "blue"
                        ? "#3b82f6"
                        : color.toLowerCase() === "navy"
                        ? "#1e3a8a"
                        : color.toLowerCase() === "green"
                        ? "#10b981"
                        : color.toLowerCase() === "purple"
                        ? "#8b5cf6"
                        : color.toLowerCase() === "pink"
                        ? "#ec4899"
                        : color.toLowerCase() === "brown"
                        ? "#92400e"
                        : color.toLowerCase() === "tan"
                        ? "#d2b48c"
                        : color.toLowerCase() === "silver"
                        ? "#9ca3af"
                        : color.toLowerCase() === "rose gold"
                        ? "#f59e0b"
                        : "#6b7280",
                  }}
                />
                <span className="text-sm text-text-secondary">{color}</span>
              </div>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Mobile Apply Button */}
      {onClose && (
        <div className="mt-6 pt-4 border-t border-border-light">
          <button onClick={onClose} className="w-full btn-primary">
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
}
