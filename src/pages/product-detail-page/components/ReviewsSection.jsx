import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

function ReviewsSection({ productId, rating, reviewCount }) {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState('all');

  // Mock reviews data
  useEffect(() => {
    const mockReviews = [
      {
        id: 1,
        user: {
          name: "Sarah Johnson",
          avatar: "https://randomuser.me/api/portraits/women/1.jpg",
          verified: true
        },
        rating: 5,
        title: "Exceptional sound quality and comfort",
        content: `These headphones exceeded my expectations in every way. The sound quality is crystal clear with deep bass and crisp highs. I've been using them for both music and work calls, and they perform flawlessly in both scenarios.

The noise cancellation is impressive - I can focus completely even in noisy environments. The battery life easily lasts through my longest work days, and the quick charge feature is a lifesaver when I forget to charge them overnight.`,
        date: new Date(Date.now() - 86400000 * 5),
        helpful: 23,
        verified: true,
        images: [
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop"
        ]
      },
      {
        id: 2,
        user: {
          name: "Michael Chen",
          avatar: "https://randomuser.me/api/portraits/men/2.jpg",
          verified: true
        },
        rating: 4,
        title: "Great value for money",
        content: `Solid headphones with good build quality. The sound is well-balanced and the comfort level is excellent for long listening sessions. The only minor issue is that the touch controls can be a bit sensitive sometimes, but overall very satisfied with the purchase.`,
        date: new Date(Date.now() - 86400000 * 12),
        helpful: 18,
        verified: true
      },
      {
        id: 3,
        user: {
          name: "Emily Rodriguez",
          avatar: "https://randomuser.me/api/portraits/women/3.jpg",
          verified: false
        },
        rating: 5,
        title: "Perfect for travel and daily use",
        content: `I travel frequently for work and these headphones have become my essential companion. The foldable design makes them easy to pack, and the carrying case is well-made. The noise cancellation works wonderfully on flights.`,
        date: new Date(Date.now() - 86400000 * 18),
        helpful: 15,
        verified: true
      },
      {
        id: 4,
        user: {
          name: "David Thompson",
          avatar: "https://randomuser.me/api/portraits/men/4.jpg",
          verified: true
        },
        rating: 3,
        title: "Good but not perfect",
        content: `The headphones are decent for the price point. Sound quality is good, though I was expecting a bit more bass. The build quality feels solid and they're comfortable to wear. Setup was easy and connection is stable.`,
        date: new Date(Date.now() - 86400000 * 25),
        helpful: 8,
        verified: true
      }
    ];

    setReviews(mockReviews);
  }, [productId]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name="Star"
          size={16}
          className={i <= rating ? "text-accent fill-current" : "text-secondary-300"}
        />
      );
    }
    return stars;
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();
  const totalReviews = reviews.length;

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'highest', label: 'Highest Rating' },
    { value: 'lowest', label: 'Lowest Rating' },
    { value: 'helpful', label: 'Most Helpful' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Ratings' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '2', label: '2 Stars' },
    { value: '1', label: '1 Star' }
  ];

  return (
    <div className="space-y-8">
      {/* Reviews Header */}
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-6">Customer Reviews</h2>
        
        {/* Rating Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Overall Rating */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="text-4xl font-bold text-text-primary">{rating}</div>
              <div>
                <div className="flex items-center space-x-1 mb-1">
                  {renderStars(Math.round(rating))}
                </div>
                <p className="text-sm text-text-secondary">
                  Based on {reviewCount.toLocaleString()} reviews
                </p>
              </div>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = ratingDistribution[stars] || 0;
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              
              return (
                <div key={stars} className="flex items-center space-x-3">
                  <span className="text-sm text-text-secondary w-8">{stars}</span>
                  <Icon name="Star" size={14} className="text-accent fill-current" />
                  <div className="flex-1 bg-secondary-200 rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-text-secondary w-8">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 border-b border-border pb-4">
        <div className="flex items-center space-x-4">
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="px-3 py-2 border border-border rounded-md text-sm text-text-primary bg-background focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <label className="text-sm text-text-secondary">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-border rounded-md text-sm text-text-primary bg-background focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.slice(0, 3).map((review) => (
          <div key={review.id} className="border-b border-border pb-6 last:border-b-0">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-surface">
                  {review.user.avatar ? (
                    <Image
                      src={review.user.avatar}
                      alt={review.user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon name="User" size={20} className="text-text-secondary" />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-medium text-text-primary">{review.user.name}</h4>
                  {review.user.verified && (
                    <div className="flex items-center space-x-1">
                      <Icon name="CheckCircle" size={14} className="text-success" />
                      <span className="text-xs text-success">Verified</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-3 mb-2">
                  <div className="flex items-center space-x-1">
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-sm text-text-secondary">
                    {formatDate(review.date)}
                  </span>
                </div>

                <h5 className="font-medium text-text-primary mb-2">{review.title}</h5>
                
                <div className="text-text-secondary leading-relaxed mb-4">
                  <p>{review.content}</p>
                </div>

                {review.images && review.images.length > 0 && (
                  <div className="flex space-x-2 mb-4">
                    {review.images.map((image, index) => (
                      <div key={index} className="w-16 h-16 rounded-md overflow-hidden bg-surface">
                        <Image
                          src={image}
                          alt={`Review image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-sm text-text-secondary hover:text-primary transition-colors duration-150">
                    <Icon name="ThumbsUp" size={14} />
                    <span>Helpful ({review.helpful})</span>
                  </button>
                  <button className="text-sm text-text-secondary hover:text-primary transition-colors duration-150">
                    Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Reviews Button */}
      {reviews.length > 3 && (
        <div className="text-center">
          <button className="btn-secondary">
            View All {reviewCount.toLocaleString()} Reviews
          </button>
        </div>
      )}

      {/* Write Review Button */}
      <div className="bg-surface p-6 rounded-md text-center">
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Share Your Experience
        </h3>
        <p className="text-text-secondary mb-4">
          Help other customers by writing a review about this product.
        </p>
        <button className="btn-primary">
          Write a Review
        </button>
      </div>
    </div>
  );
}

export default ReviewsSection;