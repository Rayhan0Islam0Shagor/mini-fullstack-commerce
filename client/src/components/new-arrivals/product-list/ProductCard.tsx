import { useCart } from '@/contexts/cart-context';
import { Product } from '@/types/product.types';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }: { product: Product }) => {
  const { handleAddToCart } = useCart();
  const productName = (product.name || product.title || 'Product').trim();
  const displayName =
    productName.length > 20 ? `${productName.substring(0, 20)}..` : productName;

  const sellerName = product.category || 'Seller';

  const originalPrice = product.price * 1.1;
  const discountedPrice = product.price;
  const hasDiscount = originalPrice > discountedPrice;

  return (
    <div className="border border-gray-300 p-4 flex flex-col h-full bg-white transition-shadow">
      <Link
        href={`/products/${encodeURIComponent(product.title || '')}-${
          product.id
        }`}
      >
        <p className="text-sm text-gray-700 mb-1 font-medium">{sellerName}</p>
        <h3 className="text-[15px] font-semibold text-[#034E53] mb-3 line-clamp-1">
          {displayName}
        </h3>

        <div className="relative w-full aspect-square mb-4 bg-gray-50 overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={productName}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
              No Image
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {hasDiscount && (
            <span className="text-sm text-gray-600 line-through">
              RS {Math.round(originalPrice).toLocaleString()}
            </span>
          )}
          <span className="text-lg font-semibold text-[#0AAEB9]">
            RS {Math.round(discountedPrice).toLocaleString()}
          </span>
        </div>
      </Link>

      <button
        className="w-full bg-[#0AAEB9] text-white py-2.5 px-4  font-medium hover:bg-[#1ab8c0] cursor-pointer transition-colors mt-auto"
        onClick={() => {
          // TODO: Implement add to cart functionality
          console.log('Add to cart:', product);
          handleAddToCart(product, 1);
        }}
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
