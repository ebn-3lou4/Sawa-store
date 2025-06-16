import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

function ProductImageGallery({ images, productName }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative aspect-square bg-surface rounded-lg overflow-hidden group">
        <Image
          src={images[currentImageIndex]}
          alt={`${productName} - Image ${currentImageIndex + 1}`}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        />
        
        {/* Navigation Arrows - Desktop */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="hidden md:flex absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-background bg-opacity-80 hover:bg-opacity-100 rounded-full items-center justify-center text-text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-150"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
            <button
              onClick={nextImage}
              className="hidden md:flex absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-background bg-opacity-80 hover:bg-opacity-100 rounded-full items-center justify-center text-text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-150"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-background bg-opacity-80 px-3 py-1 rounded-full text-sm text-text-primary">
            {currentImageIndex + 1} / {images.length}
          </div>
        )}

        {/* Zoom Indicator */}
        <div className="absolute top-4 right-4 bg-background bg-opacity-80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <Icon name={isZoomed ? "ZoomOut" : "ZoomIn"} size={16} className="text-text-secondary" />
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => selectImage(index)}
              className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden border-2 transition-all duration-150 ${
                index === currentImageIndex
                  ? 'border-primary shadow-sm'
                  : 'border-border hover:border-secondary-300'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Mobile Swipe Indicators */}
      {images.length > 1 && (
        <div className="md:hidden flex justify-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => selectImage(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-150 ${
                index === currentImageIndex ? 'bg-primary' : 'bg-secondary-300'
              }`}
            />
          ))}
        </div>
      )}

      {/* Mobile Navigation Buttons */}
      {images.length > 1 && (
        <div className="md:hidden flex justify-between">
          <button
            onClick={prevImage}
            className="flex items-center space-x-2 px-4 py-2 bg-surface rounded-md text-text-secondary hover:text-primary transition-colors duration-150"
          >
            <Icon name="ChevronLeft" size={16} />
            <span className="text-sm">Previous</span>
          </button>
          <button
            onClick={nextImage}
            className="flex items-center space-x-2 px-4 py-2 bg-surface rounded-md text-text-secondary hover:text-primary transition-colors duration-150"
          >
            <span className="text-sm">Next</span>
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductImageGallery;