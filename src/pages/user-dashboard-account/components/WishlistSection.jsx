import React from "react";
import { useShop } from "../../../context/ShopContext";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Header from "../../../components/ui/Header";
import Footer from "../../../components/Footer";

function WishlistSection() {
  const { wishlist, removeFromWishlist, addToCart } = useShop();

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
          name="StarHalf"
          size={14}
          className="text-accent fill-current"
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {wishlist.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Heart" size={32} className="text-secondary-400" />
            </div>
            <h3 className="text-lg font-medium text-text-primary mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-text-secondary mb-6">
              Save items you love to your wishlist
            </p>
            <Link
              to="/product-catalog-browse"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-700 transition-colors duration-150"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-semibold text-text-primary">
                My Wishlist ({wishlist.length} items)
              </h2>
              <div className="flex items-center space-x-2">
                <select className="input-field text-sm py-2 px-4 rounded-md border border-border focus:ring-2 focus:ring-primary/50 focus:border-primary">
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="bg-surface rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="relative">
                    <div className="aspect-square overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Stock Status Badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.inStock
                            ? "bg-success-100 text-success-700"
                            : "bg-error-100 text-error-700"
                        }`}
                      >
                        {item.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>

                    {/* Discount Badge */}
                    {item.originalPrice && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-error text-white px-2 py-1 rounded-full text-xs font-medium">
                          {Math.round(
                            ((item.originalPrice - item.price) /
                              item.originalPrice) *
                              100
                          )}
                          % OFF
                        </span>
                      </div>
                    )}

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-3 right-3 w-8 h-8 bg-background bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all duration-150 hover:scale-110 shadow-md"
                      title="Remove from wishlist"
                    >
                      <Icon
                        name="X"
                        size={16}
                        className="text-text-secondary hover:text-error"
                      />
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="mb-2">
                      <p className="text-xs text-text-secondary mb-1">
                        {item.brand} • {item.category}
                      </p>
                      <h3 className="font-medium text-text-primary line-clamp-2 mb-2">
                        {item.name}
                      </h3>
                    </div>

                    <div className="flex items-center space-x-1 mb-3">
                      <div className="flex items-center space-x-1">
                        {renderStars(item.rating)}
                      </div>
                      <span className="text-sm text-text-secondary">
                        {item.rating} ({item.reviews?.toLocaleString() || 0})
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-lg font-bold text-text-primary font-mono">
                        ${item.price.toFixed(2)}
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm text-text-secondary line-through font-mono">
                          ${item.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => addToCart(item)}
                        disabled={!item.inStock}
                        className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors duration-150 ${
                          item.inStock
                            ? "bg-primary text-white hover:bg-primary-700"
                            : "bg-secondary-100 text-secondary-400 cursor-not-allowed"
                        }`}
                      >
                        <Icon name="ShoppingCart" size={16} />
                        <span>
                          {item.inStock ? "Add to Cart" : "Out of Stock"}
                        </span>
                      </button>

                      <Link
                        to={`/product-detail-page?id=${item.id}`}
                        className="flex items-center justify-center w-10 h-10 bg-surface border border-border rounded-md text-text-secondary hover:text-primary hover:bg-secondary-50 transition-colors duration-150"
                        title="View details"
                      >
                        <Icon name="Eye" size={16} />
                      </Link>
                    </div>

                    <div className="mt-3 pt-3 border-t border-border-light">
                      <p className="text-xs text-text-secondary">
                        Added{" "}
                        {new Date(
                          item.addedDate || Date.now()
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bulk Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-surface border border-border rounded-lg shadow-sm">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-border focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                  <span className="text-sm text-text-secondary">
                    Select all items
                  </span>
                </label>
              </div>
              <div className="flex space-x-2">
                <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary-700 transition-colors duration-150 shadow-sm">
                  <Icon name="ShoppingCart" size={16} />
                  <span>Add Selected to Cart</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-error-100 text-error-700 rounded-md text-sm font-medium hover:bg-error-200 transition-colors duration-150 shadow-sm">
                  <Icon name="Trash2" size={16} />
                  <span>Remove Selected</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default WishlistSection;
