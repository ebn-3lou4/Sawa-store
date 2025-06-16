import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

function AuthenticationToggle() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Authentication & user data setup + sync with profile changes
  useEffect(() => {
    // 1. Initial load
    const authStatus = localStorage.getItem('isAuthenticated');
    const storedProfile = localStorage.getItem('userProfile') || localStorage.getItem('userData');

    if (authStatus === 'true' && storedProfile) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedProfile));
    } else {
      // Fallback mock user (demo only)
      const mockUser = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: null,
      };
      setUser(mockUser);
      setIsAuthenticated(true); // adjust as needed for real auth
    }

    // 2. Listen for profile updates in localStorage (e.g., from AccountSettings)
    const handleStorageChange = (e) => {
      if (e.key === 'userProfile' && e.newValue) {
        try {
          const updated = JSON.parse(e.newValue);
          setUser(updated);
        } catch (err) {
          console.error('Failed to parse updated userProfile', err);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData');
    setShowDropdown(false);
    navigate('/product-catalog-browse');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const userMenuItems = [
    {
      label: 'My Account',
      path: '/user-dashboard-account',
      icon: 'User'
    },
    {
      label: 'Order History',
      path: '/order-confirmation-tracking',
      icon: 'Package'
    },
    {
      label: 'Settings',
      path: '/user-dashboard-account',
      icon: 'Settings'
    }
  ];

  if (!isAuthenticated) {
    return (
      <Link
        to="/user-authentication-login-register"
        className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-text-secondary hover:text-primary hover:bg-surface transition-colors duration-150 min-w-touch min-h-touch"
      >
        <Icon name="LogIn" size={18} />
        <span className="hidden sm:block">Sign In</span>
      </Link>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-text-secondary hover:text-primary hover:bg-surface transition-colors duration-150 min-w-touch min-h-touch"
      >
        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
          <Icon name="User" size={16} className="text-primary" />
        </div>
        <span className="hidden lg:block max-w-24 truncate">
          {user?.name?.split(' ')[0] || 'Account'}
        </span>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`hidden lg:block transition-transform duration-150 ${
            showDropdown ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* User Dropdown Menu */}
      {showDropdown && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-background border border-border rounded-md shadow-modal z-dropdown">
          <div className="p-3 border-b border-border-light">
            <p className="text-sm font-medium text-text-primary truncate">
              {user?.name}
            </p>
            <p className="text-xs text-text-secondary truncate">
              {user?.email}
            </p>
          </div>

          <div className="py-2">
            {userMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setShowDropdown(false)}
                className="flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-primary hover:bg-surface transition-colors duration-150"
              >
                <Icon name={item.icon} size={16} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="border-t border-border-light py-2">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-error hover:bg-error-50 transition-colors duration-150 w-full text-left"
            >
              <Icon name="LogOut" size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AuthenticationToggle;