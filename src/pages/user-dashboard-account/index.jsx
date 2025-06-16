import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Image from "../../components/AppImage";
import Header from "../../components/ui/Header";
import RecentOrders from "./components/RecentOrders";
import WishlistSection from "./components/WishlistSection";
import AddressBook from "./components/AddressBook";
import PaymentMethods from "./components/PaymentMethods";
import AccountSettings from "./components/AccountSettings";
import QuickActions from "./components/QuickActions";

function UserDashboardAccount() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Load user data from localStorage or fallback to mock user
  useEffect(() => {
    const storedUser = localStorage.getItem("userProfile");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      return;
    }
    const mockUser = {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      dateOfBirth: "1990-05-15",
      gender: "male",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      memberSince: "2022-03-15",
      totalOrders: 24,
      totalSpent: 2847.5,
      loyaltyPoints: 1250,
    };
    // Save mock user to localStorage for future persistence
    localStorage.setItem("userProfile", JSON.stringify(mockUser));
    setUser(mockUser);
  }, []);

  const handleUpdateUser = (updatedUserData) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, ...updatedUserData };
      localStorage.setItem("userProfile", JSON.stringify(updatedUser));
      return updatedUser;
    });
    console.log("User data updated in UserDashboardAccount:", updatedUserData);
  };

  const sidebarMenuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "LayoutDashboard",
      description: "Overview & quick actions",
    },
    {
      id: "orders",
      label: "Order History",
      icon: "Package",
      description: "Track your purchases",
    },
    {
      id: "wishlist",
      label: "Wishlist",
      icon: "Heart",
      description: "Saved items",
    },
    {
      id: "addresses",
      label: "Addresses",
      icon: "MapPin",
      description: "Shipping addresses",
    },
    {
      id: "payments",
      label: "Payment Methods",
      icon: "CreditCard",
      description: "Saved payment options",
    },
    {
      id: "settings",
      label: "Account Settings",
      icon: "Settings",
      description: "Preferences & security",
    },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case "orders":
        return <RecentOrders />;
      case "wishlist":
        return <WishlistSection />;
      case "addresses":
        return <AddressBook />;
      case "payments":
        return <PaymentMethods />;
      case "settings":
        return <AccountSettings user={user} onUpdateUser={handleUpdateUser} />;
      default:
        return <DashboardOverview user={user} />;
    }
  };

  const DashboardOverview = ({ user }) => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary-600 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center overflow-hidden">
            {/* {user?.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 object-cover rounded-full"
              />
            ) : ( */}
            <Icon name="User" size={32} color="white" />
            {/* )} */}
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              Welcome back, {user?.name?.split(" ")[0]}!
            </h1>
            <p className="text-primary-100">
              Member since{" "}
              {new Date(user?.memberSince).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">Total Orders</p>
              <p className="text-2xl font-bold text-text-primary">
                {user?.totalOrders}
              </p>
            </div>
            <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
              <Icon name="Package" size={24} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">Total Spent</p>
              <p className="text-2xl font-bold text-text-primary font-mono">
                ${user?.totalSpent?.toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 bg-success-50 rounded-lg flex items-center justify-center">
              <Icon name="DollarSign" size={24} className="text-success" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">Loyalty Points</p>
              <p className="text-2xl font-bold text-text-primary">
                {user?.loyaltyPoints}
              </p>
            </div>
            <div className="w-12 h-12 bg-accent-50 rounded-lg flex items-center justify-center">
              <Icon name="Star" size={24} className="text-accent" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Orders Preview */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">
            Recent Orders
          </h2>
          <button
            onClick={() => setActiveSection("orders")}
            className="text-primary hover:text-primary-700 text-sm font-medium flex items-center space-x-1"
          >
            <span>View All</span>
            <Icon name="ArrowRight" size={16} />
          </button>
        </div>
        <RecentOrders preview={true} />
      </div>
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-surface">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Icon
              name="Loader2"
              size={32}
              className="text-primary animate-spin mx-auto mb-4"
            />
            <p className="text-text-secondary">Loading your account...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Mobile Menu Button */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full flex items-center justify-between p-4 bg-background border border-border rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Icon name="Menu" size={20} className="text-text-secondary" />
                <span className="font-medium text-text-primary">
                  Account Menu
                </span>
              </div>
              <Icon
                name="ChevronDown"
                size={20}
                className={`text-text-secondary transition-transform duration-150 ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <div
            className={`lg:col-span-3 ${
              isMobileMenuOpen ? "block" : "hidden lg:block"
            }`}
          >
            <div className="bg-background border border-border rounded-lg p-4 sticky top-24">
              <nav className="space-y-2">
                {sidebarMenuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-md text-left transition-colors duration-150 ${
                      activeSection === item.id
                        ? "bg-primary text-white"
                        : "text-text-secondary hover:text-primary hover:bg-surface"
                    }`}
                  >
                    <Icon
                      name={item.icon}
                      size={20}
                      className={
                        activeSection === item.id
                          ? "text-white"
                          : "text-current"
                      }
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm font-medium ${
                          activeSection === item.id
                            ? "text-white"
                            : "text-current"
                        }`}
                      >
                        {item.label}
                      </p>
                      <p
                        className={`text-xs ${
                          activeSection === item.id
                            ? "text-primary-100"
                            : "text-text-secondary"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </button>
                ))}
              </nav>

              {/* Logout Button */}
              <div className="border-t border-border-light mt-6 pt-4">
                <Link
                  to="/"
                  className="w-full flex items-center space-x-3 px-3 py-3 rounded-md text-left text-text-secondary hover:text-primary hover:bg-surface transition-colors duration-150"
                >
                  <Icon name="LogOut" size={20} className="text-current" />
                  <span className="text-sm font-medium">Sign Out</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div
            className={`lg:col-span-9 ${isMobileMenuOpen ? "hidden" : "block"}`}
          >
            <div className="bg-background border border-border rounded-lg p-6">
              {renderActiveSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboardAccount;
