import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/ui/Header";
import Icon from "../../components/AppIcon";
import { useShop } from "../../context/ShopContext";

import ProductImageGallery from "./components/ProductImageGallery";
import ProductInfo from "./components/ProductInfo";
import ProductTabs from "./components/ProductTabs";
import RelatedProducts from "./components/RelatedProducts";
import ReviewsSection from "./components/ReviewsSection";

function ProductDetailPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id") || "1";
  const { wishlist, addToWishlist, removeFromWishlist, addToCart } = useShop();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const isWishlisted = wishlist.some((item) => item.id === product?.id);

  // Mock product data
  useEffect(() => {
    const mockProduct = {
      id: productId,
      name: "Premium Wireless Bluetooth Headphones",
      brand: "AudioTech Pro",
      price: 199.99,
      originalPrice: 249.99,
      discount: 20,
      rating: 4.5,
      reviewCount: 1247,
      availability: "In Stock",
      sku: "ATP-WH-001",
      category: "Electronics > Audio > Headphones",
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&h=800&fit=crop",
      ],
      variants: [
        {
          id: 1,
          type: "color",
          name: "Midnight Black",
          value: "#000000",
          stock: 15,
          price: 199.99,
        },
        {
          id: 2,
          type: "color",
          name: "Pearl White",
          value: "#FFFFFF",
          stock: 8,
          price: 199.99,
        },
        {
          id: 3,
          type: "color",
          name: "Rose Gold",
          value: "#E8B4A0",
          stock: 12,
          price: 219.99,
        },
      ],
      description: `Experience premium audio quality with our flagship wireless headphones. Featuring advanced noise cancellation technology, these headphones deliver crystal-clear sound with deep bass and crisp highs.

Perfect for music lovers, professionals, and anyone who demands the best in audio technology. The ergonomic design ensures comfort during extended listening sessions.`,
      specifications: [
        { label: "Driver Size", value: "40mm Dynamic" },
        { label: "Frequency Response", value: "20Hz - 20kHz" },
        { label: "Battery Life", value: "Up to 30 hours" },
        {
          label: "Charging Time",
          value: "2 hours (Quick charge: 15 min = 3 hours)",
        },
        { label: "Connectivity", value: "Bluetooth 5.0, 3.5mm Jack" },
        { label: "Weight", value: "250g" },
        { label: "Warranty", value: "2 Years International" },
      ],
      features: [
        "Active Noise Cancellation (ANC)",
        "Premium leather ear cushions",
        "Foldable design for portability",
        "Built-in microphone for calls",
        "Touch controls",
        "Voice assistant compatible",
      ],
      shipping: {
        freeShipping: true,
        estimatedDelivery: "3-5 business days",
        returnPolicy: "30-day return policy",
        warranty: "2-year manufacturer warranty",
      },
    };

    setProduct(mockProduct);
    setSelectedVariant(mockProduct.variants[0]);
  }, [productId]);

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    const cartItem = {
      productId: product.id,
      name: product.name,
      price: selectedVariant.price,
      quantity: quantity,
      variant: selectedVariant,
      image: product.images[0],
    };

    addToCart(cartItem);
    navigate("/shopping-cart-checkout");
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const breadcrumbs = [
    { label: "Home", path: "/product-catalog-browse" },
    {
      label: "Electronics",
      path: "/product-catalog-browse?category=electronics",
    },
    { label: "Audio", path: "/product-catalog-browse?category=audio" },
    {
      label: "Headphones",
      path: "/product-catalog-browse?category=headphones",
    },
    { label: product?.name || "Product", path: null },
  ];

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Icon
              name="Loader2"
              size={48}
              className="animate-spin text-primary mx-auto mb-4"
            />
            <p className="text-text-secondary">Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb Navigation */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <Icon
                    name="ChevronRight"
                    size={16}
                    className="text-text-secondary"
                  />
                )}
                {crumb.path ? (
                  <button
                    onClick={() => navigate(crumb.path)}
                    className="text-text-secondary hover:text-primary transition-colors duration-150"
                  >
                    {crumb.label}
                  </button>
                ) : (
                  <span className="text-text-primary font-medium truncate">
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="lg:hidden flex items-center space-x-2 text-text-secondary hover:text-primary mb-6 transition-colors duration-150"
        >
          <Icon name="ArrowLeft" size={20} />
          <span>Back</span>
        </button>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="order-1">
            <ProductImageGallery
              images={product.images}
              productName={product.name}
            />
          </div>

          {/* Product Information */}
          <div className="order-2">
            <ProductInfo
              product={product}
              selectedVariant={selectedVariant}
              setSelectedVariant={setSelectedVariant}
              quantity={quantity}
              setQuantity={setQuantity}
              isWishlisted={isWishlisted}
              onWishlistToggle={handleWishlistToggle}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <ProductTabs
            product={product}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <ReviewsSection
            productId={product.id}
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <RelatedProducts currentProductId={product.id} />
        </div>
      </div>

      {/* Mobile Sticky Purchase Panel */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-sticky">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="text-lg font-bold text-primary font-mono">
              ${selectedVariant?.price?.toFixed(2)}
            </div>
            {product.originalPrice > product.price && (
              <div className="text-sm text-text-secondary line-through">
                ${product.originalPrice.toFixed(2)}
              </div>
            )}
          </div>
          <button
            onClick={handleWishlistToggle}
            className="p-3 rounded-md border border-border hover:bg-surface transition-colors duration-150"
          >
            <Icon
              name={isWishlisted ? "Heart" : "Heart"}
              size={20}
              className={
                isWishlisted ? "text-error fill-current" : "text-text-secondary"
              }
            />
          </button>
          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant || selectedVariant.stock === 0}
            className="flex-1 bg-primary text-white py-3 px-6 rounded-md font-medium hover:bg-primary-700 disabled:bg-secondary-300 disabled:cursor-not-allowed transition-colors duration-150"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
