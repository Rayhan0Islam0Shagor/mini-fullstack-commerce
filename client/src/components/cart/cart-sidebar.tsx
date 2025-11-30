'use client';

import { useCart } from '@/contexts/cart-context';
import { CartItem } from '@/types/cart.types';
import { AnimatePresence, motion } from 'motion/react';
import {
  CartHeader,
  CartItemRow,
  EmptyCartState,
  CartSummary,
} from './molecules';
import { backdropVariants, itemVariants, sidebarVariants } from './animations';

const CartSidebar = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    handleRemove,
    handleQuantityChange,
    subtotal,
  } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-[#00000060] z-40"
            onClick={closeCart}
          />

          {/* Sidebar */}
          <motion.div
            key="sidebar"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-full w-full sm:w-96 text-black bg-white shadow-2xl rounded-l-2zl z-50"
          >
            <div className="flex flex-col h-full">
              <CartHeader onClose={closeCart} />

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="h-full flex items-center justify-center"
                  >
                    <EmptyCartState onClose={closeCart} />
                  </motion.div>
                ) : (
                  <div className="space-y-4 overflow-hidden">
                    <AnimatePresence mode="popLayout">
                      {cart.map((item: CartItem, index: number) => (
                        <motion.div
                          key={item?.product?.id}
                          custom={index}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          layout
                        >
                          <CartItemRow
                            item={item}
                            onClose={closeCart}
                            onQuantityChange={handleQuantityChange}
                            onRemove={handleRemove}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Footer with Summary */}
              {cart.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <CartSummary subtotal={subtotal} />
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
