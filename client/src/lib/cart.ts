import { CartItem } from '@/types/cart.types';
import { Product } from '@/types/product.types';

export const getCartFromStorage = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const saveCartToStorage = (cart: CartItem[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const addToCart = (product: Product, quantity: number = 1) => {
  const cart = getCartFromStorage();
  const existingItem = cart.find((item) => item.product.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }

  saveCartToStorage(cart);
  // Dispatch event to notify all components
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('cartUpdated'));
  }
  return cart;
};

export const removeFromCart = (productId: number) => {
  const cart = getCartFromStorage();
  const filteredCart = cart.filter((item) => item.product.id !== productId);
  saveCartToStorage(filteredCart);
  // Dispatch event to notify all components
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('cartUpdated'));
  }
  return filteredCart;
};

export const updateCartQuantity = (productId: number, quantity: number) => {
  const cart = getCartFromStorage();
  const item = cart.find((item) => item.product.id === productId);

  if (item) {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }
    item.quantity = quantity;
  }

  saveCartToStorage(cart);
  // Dispatch event to notify all components
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('cartUpdated'));
  }
  return cart;
};

export const clearCart = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('cart');
  // Dispatch event to notify all components
  window.dispatchEvent(new Event('cartUpdated'));
};

export const getCartTotal = (cart: CartItem[]): number => {
  return cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
};
