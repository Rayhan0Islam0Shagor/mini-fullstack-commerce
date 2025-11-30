'use client';

import {
  addToCart,
  getCartFromStorage,
  getCartTotal,
  removeFromCart,
  updateCartQuantity,
} from '@/lib/cart';
import { CartItem } from '@/types/cart.types';
import { Product } from '@/types/product.types';
import { createContext, useState, ReactNode, useEffect, use } from 'react';

interface CartContextType {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  cart: CartItem[];
  handleQuantityChange: (productId: number, quantity: number) => void;
  handleRemove: (productId: number) => void;
  subtotal: number;
  cartCount: number;
  handleAddToCart: (product: Product, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const [cart, setCart] = useState<CartItem[]>(getCartFromStorage());
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCart(getCartFromStorage());

    const handleCartUpdate = () => {
      setCart(getCartFromStorage());
    };

    // Show success message only when product is added from product card
    const handleProductAdded = () => {
      setCart(getCartFromStorage());
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('productAddedToCart', handleProductAdded);
    window.addEventListener('storage', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('productAddedToCart', handleProductAdded);
      window.removeEventListener('storage', handleCartUpdate);
    };
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = getCartFromStorage();
      const count = cart.length;
      setCartCount(count);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  useEffect(() => {
    // if cart is open, make sure the main page should not be scrollable
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCartOpen]);

  const handleQuantityChange = (productId: number, quantity: number) => {
    // updateCartQuantity already dispatches cartUpdated event
    const updatedCart = updateCartQuantity(productId, quantity);
    setCart(updatedCart);
  };

  const handleRemove = (productId: number) => {
    // removeFromCart already dispatches cartUpdated event
    const updatedCart = removeFromCart(productId);
    setCart(updatedCart);
  };

  const subtotal = getCartTotal(cart);

  const handleAddToCart = (product: Product, quantity: number) => {
    addToCart(product, quantity);
  };

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        cart,
        handleQuantityChange,
        handleRemove,
        subtotal,
        cartCount,
        handleAddToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = use(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
