import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../AppIcon";

function NavigationMenu({ isOpen, onClose, navigationItems }) {
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const additionalMenuItems = [
    {
      label: "Categories",
      items: [
        {
          label: "Electronics",
          path: "/product-catalog-browse?category=electronics",
          icon: "Smartphone",
        },
        {
          label: "Clothing",
          path: "/product-catalog-browse?category=clothing",
          icon: "Shirt",
        },
        {
          label: "Home & Garden",
          path: "/product-catalog-browse?category=home",
          icon: "Home",
        },
        {
          label: "Sports",
          path: "/product-catalog-browse?category=sports",
          icon: "Dumbbell",
        },
      ],
    },
    {
      label: "Account",
      items: [
        {
          label: "My Orders",
          path: "/order-confirmation-tracking",
          icon: "Package",
        },
        {
          label: "Account Settings",
          path: "/user-dashboard-account",
          icon: "Settings",
        },
      ],
    },
    {
      label: "Support",
      items: [
        { label: "Help Center", path: "#", icon: "HelpCircle" },
        { label: "Contact Us", path: "#", icon: "MessageCircle" },
        { label: "Shipping Info", path: "#", icon: "Truck" },
      ],
    },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-mobile-menu lg:hidden"
        onClick={onClose}
      />

      {/* Mobile Menu */}
      <div className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-background border-r border-border z-mobile-menu transform transition-transform duration-300 ease-out lg:hidden overflow-y-auto">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Icon name="ShoppingBag" size={20} color="white" />
              </div>
              <span className="text-xl font-bold text-text-primary">
                ShopHub
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-text-secondary hover:text-primary hover:bg-surface transition-colors duration-150"
            >
              <Icon name="X" size={24} />
            </button>
          </div>

          {/* Main Navigation */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
              Main Menu
            </h3>
            <nav className="space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-colors duration-150 ${
                    isActivePath(item.path)
                      ? "text-primary bg-primary-50"
                      : "text-text-secondary hover:text-primary hover:bg-surface"
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Additional Menu Sections */}
          {additionalMenuItems.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
                {section.label}
              </h3>
              <nav className="space-y-1">
                {section.items.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm transition-colors duration-150 ${
                      isActivePath(item.path)
                        ? "text-primary bg-primary-50"
                        : "text-text-secondary hover:text-primary hover:bg-surface"
                    }`}
                  >
                    <Icon name={item.icon} size={18} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          ))}

          {/* Quick Actions */}
          <div className="border-t border-border-light pt-6 mt-6">
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/shopping-cart-checkout"
                onClick={onClose}
                className="flex flex-col items-center justify-center p-4 bg-surface rounded-md hover:bg-secondary-100 transition-colors duration-150"
              >
                <Icon
                  name="ShoppingCart"
                  size={24}
                  className="text-primary mb-2"
                />
                <span className="text-xs font-medium text-text-primary">
                  Cart
                </span>
              </Link>
              <Link
                to="/user-dashboard-account"
                onClick={onClose}
                className="flex flex-col items-center justify-center p-4 bg-surface rounded-md hover:bg-secondary-100 transition-colors duration-150"
              >
                <Icon name="User" size={24} className="text-primary mb-2" />
                <span className="text-xs font-medium text-text-primary">
                  Account
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavigationMenu;
