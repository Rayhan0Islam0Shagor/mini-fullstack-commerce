'use client';

import { AnimatedAutocomplete } from './AnimatedAutocomplete';

const ProductSearch = () => {
  return (
    <div className="flex-1 flex items-stretch">
      <AnimatedAutocomplete
        placeholder="Search for a product"
        className="flex-1 h-full"
        debounceMs={500}
        limit={10}
      />
    </div>
  );
};

export default ProductSearch;
