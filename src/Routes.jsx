import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Page imports
import UserAuthentication from "pages/user-authentication-login-register";
import ProductCatalogBrowse from "pages/product-catalog-browse";
import ProductDetailPage from "pages/product-detail-page";
import ShoppingCartCheckout from "pages/shopping-cart-checkout";
import UserDashboardAccount from "pages/user-dashboard-account";
import OrderConfirmationTracking from "pages/order-confirmation-tracking";
import WishlistSection from "pages/user-dashboard-account/components/WishlistSection";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<ProductCatalogBrowse />} />
          <Route
            path="/user-authentication-login-register"
            element={<UserAuthentication />}
          />
          <Route
            path="/product-catalog-browse"
            element={<ProductCatalogBrowse />}
          />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route
            path="/shopping-cart-checkout"
            element={<ShoppingCartCheckout />}
          />
          <Route
            path="/user-dashboard-account"
            element={<UserDashboardAccount />}
          />
          <Route
            path="/order-confirmation-tracking"
            element={<OrderConfirmationTracking />}
          />
          <Route path="/favorites" element={<WishlistSection />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
