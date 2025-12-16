import { motion } from 'motion/react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ProductImage } from '../atoms';
import type { Product } from '@/types/product.types';

interface ProductSearchItemProps {
  item: Product;
  index: number;
  isFocused: boolean;
  href: string;
  onMouseEnter: () => void;
  onSelect?: () => void;
}

const ProductSearchItem = ({
  item,
  index,
  isFocused,
  href,
  onMouseEnter,
  onSelect,
}: ProductSearchItemProps) => {
  const label = item.title || item.name || 'Product';
  const productId = item.id.toString();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
    >
      <Link
        href={href}
        onClick={onSelect}
        onMouseEnter={onMouseEnter}
        data-product-id={productId}
        className={cn(
          'w-full rounded-md px-2 py-2 text-left transition-colors block',
          'hover:bg-gray-100 hover:text-gray-900',
          isFocused && 'bg-gray-100 text-gray-900',
          'text-gray-900',
          'flex items-center gap-2',
        )}
      >
        <ProductImage src={item.image} alt={label} size={40} />
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm line-clamp-1">{label}</div>
          {item.price !== undefined && (
            <div className="text-xs text-[#034E53] font-semibold mt-0.5">
              RS. {item.price.toLocaleString()}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductSearchItem;
