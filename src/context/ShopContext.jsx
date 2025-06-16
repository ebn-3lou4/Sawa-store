import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

// Context object
const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  // Persist cart & wishlist in localStorage so that state survives reloads
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch (_) {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("wishlist")) || [];
    } catch (_) {
      return [];
    }
  });

  // Sync with localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  /* ----------------------- cart helpers ----------------------- */
  const addToCart = useCallback((item, qty = 1) => {
    setCart(prev => {
      const idx = prev.findIndex(p => p.id === item.id);
      if (idx === -1) return [...prev, { ...item, quantity: qty }];
      return prev.map((p,i) => i === idx ? { ...p, quantity: p.quantity + qty } : p);
    });
  }, []);

  const removeFromCart = useCallback(id => {
    setCart(prev => prev.filter(p => p.id !== id));
  }, []);

  const updateCartQty = useCallback((id, qty) => {
    setCart(prev => prev.map(p => p.id === id ? { ...p, quantity: qty } : p));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  /* --------------------- wishlist helpers --------------------- */
  const addToWishlist = useCallback(item => {
    setWishlist(prev => prev.some(p => p.id === item.id) ? prev : [...prev, item]);
  }, []);

  const removeFromWishlist = useCallback(id => {
    setWishlist(prev => prev.filter(p => p.id !== id));
  }, []);

  const value = {
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    updateCartQty,
    clearCart,
    addToWishlist,
    removeFromWishlist,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => useContext(ShopContext);
