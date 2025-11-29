'use client';
import { useProduct } from '@/hooks/useProducts';
import Image from 'next/image';
import { motion } from 'motion/react';
import RelatedProducts from './RelatedProducts';

interface ProductDetailsProps {
  productId: string;
}

const ProductDetails = ({ productId }: ProductDetailsProps) => {
  const { product, isLoading, isError, error } = useProduct(productId);

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-100 animate-pulse aspect-square rounded-lg" />
        <div className="space-y-4">
          <div className="h-8 bg-gray-100 animate-pulse rounded" />
          <div className="h-6 bg-gray-100 animate-pulse rounded w-2/3" />
          <div className="h-12 bg-gray-100 animate-pulse rounded" />
          <div className="h-32 bg-gray-100 animate-pulse rounded" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center py-8">
        Error: {error?.message || 'Failed to load product'}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-gray-500 text-center py-8">Product not found</div>
    );
  }

  const productName = product.title || product.name || 'Product';
  const originalPrice = product.price * 1.1;
  const discountedPrice = product.price;
  const hasDiscount = originalPrice > discountedPrice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="relative w-full aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-300">
          {product.image ? (
            <Image
              src={product.image}
              alt={productName}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col space-y-6">
          {/* Category */}
          <p className="text-sm text-gray-700 font-medium uppercase tracking-wide">
            {product.category}
          </p>

          {/* Product Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-[#034E53]">
            {productName}
          </h1>

          {/* Price */}
          <div className="flex items-center gap-3 flex-wrap">
            {hasDiscount && (
              <span className="text-lg text-gray-600 line-through">
                RS {Math.round(originalPrice).toLocaleString()}
              </span>
            )}
            <span className="text-3xl font-semibold text-[#0AAEB9]">
              RS {Math.round(product.price).toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="px-3 py-1 bg-[#0AAEB9]/10 text-[#0AAEB9] text-sm font-medium rounded">
                Save{' '}
                {Math.round(
                  ((originalPrice - product.price) / originalPrice) * 100,
                )}
                %
              </span>
            )}
          </div>

          {/* Stock Info */}
          {product.stock !== undefined && (
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-600">Availability:</span>
              <span
                className={`font-medium ${
                  product.stock > 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {product.stock > 0
                  ? `In Stock (${product.stock})`
                  : 'Out of Stock'}
              </span>
            </div>
          )}

          {/* Rating */}
          {product.rating !== undefined && product.rating > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Rating:</span>
              <div className="flex items-center gap-1">
                <span className="text-[#0AAEB9] font-semibold">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-gray-400">★</span>
              </div>
            </div>
          )}

          {/* Description */}
          {product.description && (
            <div className="space-y-2 pt-4 border-t border-gray-200">
              <h2 className="text-lg font-semibold text-[#034E53]">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            className="w-full bg-[#0AAEB9] text-white py-3 px-6 font-medium hover:bg-[#1ab8c0] transition-colors rounded-md mt-auto disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={product.stock === 0}
            onClick={() => {
              // TODO: Implement add to cart functionality
              console.log('Add to cart:', product);
            }}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Related Products Section */}
      {product.category && (
        <RelatedProducts
          category={product.category}
          currentProductId={product.id}
        />
      )}
    </motion.div>
  );
};

export default ProductDetails;
