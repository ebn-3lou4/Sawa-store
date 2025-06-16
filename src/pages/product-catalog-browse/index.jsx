import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/ui/Header";
import Footer from "../../components/Footer";
import Icon from "../../components/AppIcon";

import ProductCard from "./components/ProductCard";
import FilterSidebar from "./components/FilterSidebar";
import FilterChips from "./components/FilterChips";
import QuickAddModal from "./components/QuickAddModal";

function ProductCatalogBrowse() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [quickAddProduct, setQuickAddProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const observerRef = useRef();

  // Define the static product data
  const staticProduct = {
    id: "static-headphones",
    name: "Wireless Bluetooth Headphones",
    brand: "TechSound",
    image: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Headphones", // Replace with actual image path if available
    rating: 4.5,
    reviewCount: 128,
    price: 79.99,
    originalPrice: 99.99,
    description:
      "Experience crystal clear sound with these comfortable wireless headphones.",
    sizes: [], // If there are no sizes for this product, keep this empty
    colors: ["Black", "White", "Gray", "Blue", "Orange"],
    inStock: true,
  };

  // Filter states
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    priceRange: [0, 1000],
    brands: [],
    sizes: [],
    colors: [],
    rating: 0,
  });

  // Mock products data
  const mockProducts = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.5,
      reviewCount: 128,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      category: "electronics",
      brand: "TechSound",
      colors: ["Black", "White", "Blue"],
      sizes: ["One Size"],
      inStock: true,
      isNew: false,
      isSale: true,
    },
    {
      id: 2,
      name: "Premium Cotton T-Shirt",
      price: 24.99,
      originalPrice: null,
      rating: 4.2,
      reviewCount: 89,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      category: "clothing",
      brand: "ComfortWear",
      colors: ["White", "Black", "Gray", "Navy"],
      sizes: ["XS", "S", "M", "L", "XL"],
      inStock: true,
      isNew: true,
      isSale: false,
    },
    {
      id: 3,
      name: "Smart Fitness Watch",
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.7,
      reviewCount: 256,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      category: "electronics",
      brand: "FitTech",
      colors: ["Black", "Silver", "Rose Gold"],
      sizes: ["38mm", "42mm"],
      inStock: true,
      isNew: false,
      isSale: true,
    },
    {
      id: 4,
      name: "Ceramic Coffee Mug Set",
      price: 34.99,
      originalPrice: null,
      rating: 4.3,
      reviewCount: 67,
      image: "https://i.ebayimg.com/images/g/Et0AAOSwI0ZjkHFI/s-l1200.jpg",
      category: "home",
      brand: "HomeEssentials",
      colors: ["White", "Blue", "Green"],
      sizes: ["12oz", "16oz"],
      inStock: true,
      isNew: false,
      isSale: false,
    },
    {
      id: 5,
      name: "Yoga Exercise Mat",
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.4,
      reviewCount: 143,
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
      category: "sports",
      brand: "FlexFit",
      colors: ["Purple", "Pink", "Blue", "Green"],
      sizes: ["Standard"],
      inStock: true,
      isNew: false,
      isSale: true,
    },
    {
      id: 6,
      name: "Leather Crossbody Bag",
      price: 89.99,
      originalPrice: null,
      rating: 4.6,
      reviewCount: 92,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      category: "accessories",
      brand: "StyleCraft",
      colors: ["Brown", "Black", "Tan"],
      sizes: ["One Size"],
      inStock: true,
      isNew: true,
      isSale: false,
    },
    {
      id: 7,
      name: "Wireless Phone Charger",
      price: 39.99,
      originalPrice: 49.99,
      rating: 4.1,
      reviewCount: 78,
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
      category: "electronics",
      brand: "PowerTech",
      colors: ["Black", "White"],
      sizes: ["Standard"],
      inStock: true,
      isNew: false,
      isSale: true,
    },
    {
      id: 8,
      name: "Stainless Steel Water Bottle",
      price: 19.99,
      originalPrice: null,
      rating: 4.5,
      reviewCount: 234,
      image:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
      category: "sports",
      brand: "HydroLife",
      colors: ["Silver", "Black", "Blue", "Pink"],
      sizes: ["16oz", "20oz", "24oz"],
      inStock: true,
      isNew: false,
      isSale: false,
    },
  ];

  // Initialize products
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 500);
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...products];

    // Category filter (case-insensitive, ignore "All")
    if (filters.category && filters.category.toLowerCase() !== "all") {
      const selectedCategory = filters.category.toLowerCase();
      filtered = filtered.filter(
        (product) => (product.category || "").toLowerCase() === selectedCategory
      );
    }

    // Price range filter
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    // Brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter((product) =>
        filters.brands.includes(product.brand)
      );
    }

    // Color filter
    if (filters.colors.length > 0) {
      filtered = filtered.filter((product) =>
        product.colors.some((color) => filters.colors.includes(color))
      );
    }

    // Size filter
    if (filters.sizes.length > 0) {
      filtered = filtered.filter((product) =>
        product.sizes.some((size) => filters.sizes.includes(size))
      );
    }

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter((product) => product.rating >= filters.rating);
    }

    setFilteredProducts(filtered);
  }, [products, filters]);

  // Infinite scroll observer
  const lastProductElementRef = useRef();
  useEffect(() => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    });

    if (lastProductElementRef.current) {
      observerRef.current.observe(lastProductElementRef.current);
    }
  }, [loading, hasMore]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleQuickAdd = () => {
    setQuickAddProduct(staticProduct);
  };

  const clearFilter = (filterType, value) => {
    const newFilters = { ...filters };

    switch (filterType) {
      case "category":
        newFilters.category = "";
        setSearchParams({});
        break;
      case "brand":
        newFilters.brands = newFilters.brands.filter(
          (brand) => brand !== value
        );
        break;
      case "color":
        newFilters.colors = newFilters.colors.filter(
          (color) => color !== value
        );
        break;
      case "size":
        newFilters.sizes = newFilters.sizes.filter((size) => size !== value);
        break;
      case "price":
        newFilters.priceRange = [0, 1000];
        break;
      case "rating":
        newFilters.rating = 0;
        break;
      default:
        break;
    }

    setFilters(newFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.category) count++;
    if (filters.brands.length > 0) count += filters.brands.length;
    if (filters.colors.length > 0) count += filters.colors.length;
    if (filters.sizes.length > 0) count += filters.sizes.length;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) count++;
    if (filters.rating > 0) count++;
    return count;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Sidebar - Hidden on mobile by default */}
            <div
              className={`lg:w-56 lg:block ${showFilters ? "block" : "hidden"}`}
            >
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClose={() => setShowFilters(false)}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Desktop Filter Button & Sort */}
              <div className="flex items-center justify-between mb-6">
                {/* <SortDropdown sortBy={sortBy} setSortBy={setSortBy} /> */}
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickAdd={() => handleQuickAdd(product)}
                  />
                ))}
              </div>

              {/* Loading State */}
              {loading && (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              )}

              {/* Empty State */}
              {!loading && filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon name="Search" size={48} className="text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    No products found
                  </h3>
                  <p className="text-text-secondary mb-6">
                    Try adjusting your filters or search terms
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Add Modal */}
        {quickAddProduct && (
          <QuickAddModal
            product={quickAddProduct}
            onClose={() => setQuickAddProduct(null)}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ProductCatalogBrowse;
