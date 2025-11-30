'use client';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '@/contexts/cart-context';
import Image from 'next/image';
import CartSidebar from '@/components/cart/cart-sidebar';

const CartButton = () => {
  const { cartCount, toggleCart } = useCart();

  return (
    <>
      <button
        type="button"
        className="flex items-center gap-1 cursor-pointer"
        onClick={toggleCart}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleCart();
          }
        }}
      >
        <span className="relative">
          <Image
            src="/assets/icons/shopping-cart.png"
            alt="cart"
            width={24}
            height={24}
            className="object-contain"
          />
          <AnimatePresence mode="wait">
            <motion.span
              key={cartCount}
              initial={{ opacity: 0, scale: 0.5, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -5 }}
              transition={{
                duration: 0.2,
                ease: 'easeOut',
              }}
              className="absolute -top-3 left-[10px] text-[#FDDE3B] text-[15px] font-semibold min-w-[20px] text-center"
            >
              {cartCount || 0}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="text-[15px] text-white font-light">Cart</span>
      </button>

      <CartSidebar />
    </>
  );
};

export default CartButton;
