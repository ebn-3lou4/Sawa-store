import React from 'react';
import Icon from '../../../components/AppIcon';

function FilterChips({ filters, onClearFilter }) {
  const getActiveFilters = () => {
    const activeFilters = [];

    if (filters.category) {
      activeFilters.push({
        type: 'category',
        label: filters.category,
        value: filters.category
      });
    }

    if (filters.brands.length > 0) {
      filters.brands.forEach(brand => {
        activeFilters.push({
          type: 'brand',
          label: brand,
          value: brand
        });
      });
    }

    if (filters.colors.length > 0) {
      filters.colors.forEach(color => {
        activeFilters.push({
          type: 'color',
          label: color,
          value: color
        });
      });
    }

    if (filters.sizes.length > 0) {
      filters.sizes.forEach(size => {
        activeFilters.push({
          type: 'size',
          label: size,
          value: size
        });
      });
    }

    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) {
      activeFilters.push({
        type: 'price',
        label: `$${filters.priceRange[0]} - $${filters.priceRange[1]}`,
        value: 'price'
      });
    }

    if (filters.rating > 0) {
      activeFilters.push({
        type: 'rating',
        label: `${filters.rating}+ stars`,
        value: filters.rating
      });
    }

    return activeFilters;
  };

  const activeFilters = getActiveFilters();

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <div className="flex items-center space-x-2 mb-3">
        <span className="text-sm font-medium text-text-primary">Active filters:</span>
        <span className="text-sm text-text-secondary">
          ({activeFilters.length})
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter, index) => (
          <div
            key={`${filter.type}-${filter.value}-${index}`}
            className="flex items-center space-x-2 bg-primary-50 text-primary px-3 py-1.5 rounded-full text-sm font-medium border border-primary-200"
          >
            <span className="capitalize">{filter.label}</span>
            <button
              onClick={() => onClearFilter(filter.type, filter.value)}
              className="text-primary hover:text-primary-700 transition-colors duration-150"
              aria-label={`Remove ${filter.label} filter`}
            >
              <Icon name="X" size={14} />
            </button>
          </div>
        ))}
        
        {activeFilters.length > 1 && (
          <button
            onClick={() => {
              // Clear all filters
              activeFilters.forEach(filter => {
                onClearFilter(filter.type, filter.value);
              });
            }}
            className="flex items-center space-x-2 bg-secondary-100 text-secondary-700 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-secondary-200 transition-colors duration-150"
          >
            <span>Clear all</span>
            <Icon name="X" size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

export default FilterChips;