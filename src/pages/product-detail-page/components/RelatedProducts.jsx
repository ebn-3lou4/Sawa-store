import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

function RelatedProducts({ currentProductId }) {
  const navigate = useNavigate();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mock related products data
  useEffect(() => {
    const mockRelatedProducts = [
      {
        id: '2',
        name: 'Wireless Gaming Headset',
        brand: 'GameTech',
        price: 149.99,
        originalPrice: 179.99,
        rating: 4.3,
        reviewCount: 892,
        image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=400&fit=crop',
        badge: 'Gaming'
      },
      {
        id: '3',
        name: 'Studio Monitor Headphones',
        brand: 'AudioPro',
        price: 299.99,
        originalPrice: null,
        rating: 4.7,
        reviewCount: 456,
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop',
        badge: 'Professional'
      },
      {
        id: '4',
        name: 'Compact Wireless Earbuds',
        brand: 'SoundWave',
        price: 89.99,
        originalPrice: 119.99,
        rating: 4.2,
        reviewCount: 1234,
        image: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=400&h=400&fit=crop',
        badge: 'Bestseller'
      },
      {
        id: '5',
        name: 'Over-Ear Noise Cancelling',
        brand: 'QuietTech',
        price: 249.99,
        originalPrice: 299.99,
        rating: 4.6,
        reviewCount: 678,
        image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop',
        badge: 'Premium'
      },
      {
        id: '6',
        name: 'Sports Wireless Headphones',
        brand: 'FitAudio',
        price: 79.99,
        originalPrice: null,
        rating: 4.1,
        reviewCount: 543,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
        badge: 'Sports'
      },
      {
        id: '7',
        name: 'Vintage Style Headphones',
        brand: 'RetroSound',
        price: 129.99,
        originalPrice: 159.99,
        rating: 4.4,
        reviewCount: 321,
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop',
        badge: 'Vintage'
      }
    ];

    // Filter out current product
    const filtered = mockRelatedProducts.filter(product => product.id !== currentProductId);
    setRelatedProducts(filtered);
  }, [currentProductId]);

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 4
  };

  const maxIndex = Math.max(0, relatedProducts.length - itemsPerView.desktop);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const handleProductClick = (productId) => {
    navigate(`/product-detail-page?id=${productId}`);
    window.scrollTo(0, 0);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={12} className="text-accent fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="Star" size={12} className="text-accent fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={12} className="text-secondary-300" />
      );
    }

    return stars;
  };

  const getBadgeColor = (badge) => {
    const colors = {
      'Gaming': 'bg-purple-100 text-purple-700',
      'Professional': 'bg-blue-100 text-blue-700',
      'Bestseller': 'bg-green-100 text-green-700',
      'Premium': 'bg-amber-100 text-amber-700',
      'Sports': 'bg-orange-100 text-orange-700',
      'Vintage': 'bg-pink-100 text-pink-700'
    };
    return colors[badge] || 'bg-secondary-100 text-secondary-700';
  };

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text-primary">You Might Also Like</h2>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
          >
            <Icon name="ChevronRight" size={20} />
          </button>
        </div>
      </div>

      {/* Products Grid/Carousel */}
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-out"
          style={{ 
            transform: `translateX(-${currentIndex * (100 / itemsPerView.desktop)}%)`,
          }}
        >
          {relatedProducts.map((product) => (
            <div
              key={product.id}
              className="w-full md:w-1/2 lg:w-1/4 flex-shrink-0 px-2"
            >
              <div className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-150 group cursor-pointer">
                <div 
                  className="relative aspect-square bg-surface overflow-hidden"
                  onClick={() => handleProductClick(product.id)}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Badge */}
                  {product.badge && (
                    <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(product.badge)}`}>
                      {product.badge}
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    <button className="w-8 h-8 bg-background bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center text-text-secondary hover:text-primary transition-colors duration-150">
                      <Icon name="Heart" size={16} />
                    </button>
                  </div>

                  {/* Discount Badge */}
                  {product.originalPrice && product.originalPrice > product.price && (
                    <div className="absolute bottom-3 left-3 bg-error text-white px-2 py-1 rounded text-xs font-medium">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-2">
                  <div className="text-xs text-text-secondary">{product.brand}</div>
                  
                  <h3 
                    className="font-medium text-text-primary line-clamp-2 cursor-pointer hover:text-primary transition-colors duration-150"
                    onClick={() => handleProductClick(product.id)}
                  >
                    {product.name}
                  </h3>

                  <div className="flex items-center space-x-1">
                    {renderStars(product.rating)}
                    <span className="text-xs text-text-secondary ml-1">
                      ({product.reviewCount})
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-primary font-mono">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-text-secondary line-through font-mono">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <button 
                    onClick={() => handleProductClick(product.id)}
                    className="w-full mt-3 bg-primary text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors duration-150 flex items-center justify-center space-x-2"
                  >
                    <span>View Details</span>
                    <Icon name="ArrowRight" size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Navigation Dots */}
      <div className="md:hidden flex justify-center space-x-2">
        {Array.from({ length: Math.ceil(relatedProducts.length / itemsPerView.mobile) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-150 ${
              index === currentIndex ? 'bg-primary' : 'bg-secondary-300'
            }`}
          />
        ))}
      </div>

      {/* View All Products Link */}
      <div className="text-center pt-4">
        <button
          onClick={() => navigate('/product-catalog-browse')}
          className="btn-secondary flex items-center space-x-2 mx-auto"
        >
          <span>View All Products</span>
          <Icon name="ArrowRight" size={16} />
        </button>
      </div>
    </div>
  );
}

export default RelatedProducts;