'use client';
import { useProductsByCategory } from '@/hooks/useProducts';
import { motion, AnimatePresence } from 'motion/react';
import { useMemo } from 'react';
import ProductCard1 from './product-cards/ProductCard1';
import ProductCard2 from './product-cards/ProductCard2';
import ProductCard3 from './product-cards/ProductCard3';
import ProductCard4 from './product-cards/ProductCard4';
import ProductCard5 from './product-cards/ProductCard5';

const CategoryProducts = ({
  currentCategory,
}: {
  currentCategory: string | null;
}) => {
  const { products, isLoading, isError, error } =
    useProductsByCategory(currentCategory);

  // Memoize products to prevent unnecessary re-renders
  const productsKey = useMemo(
    () => (products ? products.map((p) => p._id).join(',') : ''),
    [products],
  );

  // Loading skeleton with animation
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="grid grid-cols-3 grid-rows-2 gap-4 mt-6"
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="border border-[#0000001C] p-4 bg-gray-100 animate-pulse h-[300px]"
          />
        ))}
      </motion.div>
    );
  }

  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-500 text-center py-8"
      >
        Error: {error?.message}
      </motion.div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-gray-500 text-center py-8"
      >
        No products found
      </motion.div>
    );
  }

  // Ensure we have at least 5 products
  if (products.length < 5) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-gray-500 text-center py-8"
      >
        Not enough products to display (need at least 5, found {products.length}
        )
      </motion.div>
    );
  }

  // Animation configuration
  const containerAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  };

  const itemAnimation = (index: number) => ({
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
    },
    transition: {
      duration: 0.3,
      delay: index * 0.1,
    },
  });

  // Check if all required products exist before rendering
  const product0 = products[0];
  const product1 = products[1];
  const product2 = products[2];
  const product3 = products[3];
  const product4 = products[4];

  // If any required product is missing, show error
  if (!product0 || !product1 || !product2 || !product3 || !product4) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-red-500 text-center py-8"
      >
        Error: Missing required products. Expected 5 products, but some are
        undefined.
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={productsKey}
        {...containerAnimation}
        className="grid lg:grid-cols-3 grid-cols-1 lg:grid-rows-2 grid-rows-1 gap-4 mt-6"
      >
        <ProductCard1 product={product0} animation={itemAnimation(0)} />
        <ProductCard5 product={product4} animation={itemAnimation(1)} />
        <ProductCard2 product={product1} animation={itemAnimation(2)} />
        <ProductCard3 product={product2} animation={itemAnimation(3)} />
        <ProductCard4 product={product3} animation={itemAnimation(4)} />
      </motion.div>
    </AnimatePresence>
  );
};

export default CategoryProducts;
