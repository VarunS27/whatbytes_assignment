'use client';

import React, { createContext, useEffect, useState } from 'react';
import { Cart, CartContextType, CartItem, Product } from '../types';

export const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'whatbytes-cart';

function getInitialCart(): Cart {
  if (typeof window === 'undefined') {
    return { items: [], total: 0 };
  }

  const savedCart = window.localStorage.getItem(CART_STORAGE_KEY);
  if (!savedCart) {
    return { items: [], total: 0 };
  }

  try {
    return JSON.parse(savedCart) as Cart;
  } catch {
    console.error('Failed to parse cart from localStorage');
    return { items: [], total: 0 };
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>(getInitialCart);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart]);

  const calculateTotal = (items: CartItem[]): number => {
    return Number((items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)).toFixed(2));
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find((item) => item.product.id === product.id);

      let newItems: CartItem[];
      if (existingItem) {
        newItems = prevCart.items.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        newItems = [...prevCart.items, { product, quantity }];
      }

      return {
        items: newItems,
        total: calculateTotal(newItems),
      };
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const newItems = prevCart.items.filter((item) => item.product.id !== productId);
      return {
        items: newItems,
        total: calculateTotal(newItems),
      };
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) => {
      const newItems = prevCart.items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      return {
        items: newItems,
        total: calculateTotal(newItems),
      };
    });
  };

  const clearCart = () => {
    setCart({ items: [], total: 0 });
  };

  const getCartTotal = (): number => {
    return cart.total;
  };

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
