import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

function SortDropdown({ sortBy, onSortChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortSelect = (value) => {
    onSortChange(value);
    setIsOpen(false);
  };

  const getCurrentSortLabel = () => {
    const option = sortOptions.find(opt => opt.value === sortBy);
    return option ? option.label : 'Sort by';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-surface border border-border rounded-md text-text-secondary hover:text-primary hover:bg-secondary-50 transition-colors duration-150 min-w-[160px] justify-between"
      >
        <span className="text-sm font-medium">{getCurrentSortLabel()}</span>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-56 bg-background border border-border rounded-md shadow-modal z-dropdown">
          <div className="py-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortSelect(option.value)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150 flex items-center justify-between ${
                  sortBy === option.value
                    ? 'bg-primary-50 text-primary' :'text-text-secondary hover:text-primary hover:bg-surface'
                }`}
              >
                <span>{option.label}</span>
                {sortBy === option.value && (
                  <Icon name="Check" size={16} className="text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SortDropdown;