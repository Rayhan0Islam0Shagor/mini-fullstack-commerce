import { AnimatePresence } from 'motion/react';
import { motion } from 'motion/react';
import { LoadingSpinner } from '../atoms';
import ProductSearchItem from './ProductSearchItem';
import type { Product } from '@/types/product.types';

interface SearchDropdownProps {
  isOpen: boolean;
  isLoading: boolean;
  items: Product[];
  query: string;
  focusedIndex: number;
  onSelect?: (item: Product) => void;
  onItemFocus: (index: number) => void;
  getHref: (item: Product) => string;
}

const SearchDropdown = ({
  isOpen,
  isLoading,
  items,
  query,
  focusedIndex,
  onSelect,
  onItemFocus,
  getHref,
}: SearchDropdownProps) => {
  return (
    <>
      {/* Loading State */}
      <AnimatePresence>
        {isOpen && isLoading && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-100 top-[calc(100%+4px)] left-0 w-full rounded-lg border border-gray-300 bg-white p-4 text-center text-sm text-[#ABA3A3] shadow-lg"
          >
            <LoadingSpinner size={20} className="mx-auto" />
            <p className="mt-2">Searching...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {isOpen && !isLoading && items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-100 top-[calc(100%+4px)] left-0 w-full overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg"
          >
            <div className="max-h-80 overflow-y-auto p-1">
              {items.map((item, index) => (
                <ProductSearchItem
                  key={item._id || item.id}
                  item={item}
                  index={index}
                  isFocused={focusedIndex === index}
                  href={getHref(item)}
                  onMouseEnter={() => onItemFocus(index)}
                  onSelect={() => {
                    onSelect?.(item);
                    // Close dropdown when item is selected
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No Results */}
      <AnimatePresence>
        {isOpen && !isLoading && items.length === 0 && query && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-100 top-[calc(100%+4px)] left-0 w-full rounded-lg border border-gray-300 bg-white p-4 text-center text-sm text-[#ABA3A3] shadow-lg"
          >
            No results found for "{query}"
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchDropdown;
