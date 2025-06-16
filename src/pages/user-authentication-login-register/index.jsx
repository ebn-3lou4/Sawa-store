import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function UserAuthentication() {
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();

  // Check if user is already authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/user-dashboard-account');
    }
  }, [navigate]);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Simplified Header */}
      <header className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/product-catalog-browse" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Icon name="ShoppingBag" size={20} color="white" />
              </div>
              <span className="text-xl font-bold text-text-primary">ShopHub</span>
            </Link>

            {/* Help Link */}
            <Link
              to="#"
              className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors duration-150"
            >
              <Icon name="HelpCircle" size={20} />
              <span className="hidden sm:block">Help</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Authentication Card */}
          <div className="bg-background rounded-lg shadow-modal border border-border overflow-hidden">
            {/* Tab Navigation */}
            <div className="border-b border-border">
              <nav className="flex">
                <button
                  onClick={() => handleTabSwitch('login')}
                  className={`flex-1 py-4 px-6 text-sm font-medium text-center transition-colors duration-150 ${
                    activeTab === 'login' ?'text-primary border-b-2 border-primary bg-primary-50' :'text-text-secondary hover:text-text-primary hover:bg-surface'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleTabSwitch('register')}
                  className={`flex-1 py-4 px-6 text-sm font-medium text-center transition-colors duration-150 ${
                    activeTab === 'register' ?'text-primary border-b-2 border-primary bg-primary-50' :'text-text-secondary hover:text-text-primary hover:bg-surface'
                  }`}
                >
                  Sign Up
                </button>
              </nav>
            </div>

            {/* Form Content */}
            <div className="p-6 sm:p-8">
              {/* Welcome Message */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-text-primary mb-2">
                  {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className="text-text-secondary">
                  {activeTab === 'login' ?'Sign in to your account to continue shopping' :'Join ShopHub and start your shopping journey'
                  }
                </p>
              </div>

              {/* Forms */}
              {activeTab === 'login' ? (
                <LoginForm onSwitchToRegister={() => handleTabSwitch('register')} />
              ) : (
                <RegisterForm onSwitchToLogin={() => handleTabSwitch('login')} />
              )}
            </div>
          </div>

          {/* Additional Links */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center space-x-6 text-sm text-text-secondary">
              <Link to="#" className="hover:text-primary transition-colors duration-150">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link to="#" className="hover:text-primary transition-colors duration-150">
                Terms of Service
              </Link>
              <span>•</span>
              <Link to="#" className="hover:text-primary transition-colors duration-150">
                Support
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-100 rounded-full opacity-20"></div>
      </div>
    </div>
  );
}

export default UserAuthentication;