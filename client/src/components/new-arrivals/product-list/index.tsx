'use client';

import { useProducts } from '@/hooks/useProducts';
import ProductCard from './ProductCard';

const ProductList = () => {
  const { products, isLoading, isError, error } = useProducts();

  if (isLoading) {
    return (
      <div className="grid mt-6 grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="border border-gray-300 p-4 bg-gray-100 animate-pulse h-[287px]"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-6 text-red-500 text-center py-8">
        Error loading products: {error?.message || 'Unknown error'}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="mt-6 text-gray-500 text-center py-8">
        No products found
      </div>
    );
  }

  return (
    <div className="grid mt-6 grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
