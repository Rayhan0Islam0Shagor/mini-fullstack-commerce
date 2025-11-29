'use client';
import { useProductsByCategory } from '@/hooks/useProducts';
import ProductCard from '../new-arrivals/product-list/ProductCard';
import { motion } from 'motion/react';

interface RelatedProductsProps {
  category: string;
  currentProductId: number;
}

const RelatedProducts = ({
  category,
  currentProductId,
}: RelatedProductsProps) => {
  const { products, isLoading } = useProductsByCategory(category);

  // Filter out current product and limit to 4 products
  const relatedProducts =
    products
      ?.filter((product) => product.id !== currentProductId)
      .slice(0, 4) || [];

  if (isLoading) {
    return (
      <div className="mt-16 pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-[#034E53] mb-6">
          Related Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="border border-gray-300 p-4 bg-gray-100 animate-pulse h-[287px]"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="mt-16 pt-8 border-t border-gray-200"
    >
      <h2 className="text-2xl font-bold text-[#034E53] mb-6">
        Related Products
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {relatedProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RelatedProducts;
