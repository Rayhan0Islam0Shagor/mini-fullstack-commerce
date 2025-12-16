import { useState, useRef } from 'react';
import type { Product } from '@/types/product.types';

interface UseSearchKeyboardOptions {
  items: Product[];
  isOpen: boolean;
  onSelect: (item: Product) => void;
  onClose: () => void;
  onOpen: () => void;
  getHref: (item: Product) => string;
}

export function useSearchKeyboard({
  items,
  isOpen,
  onSelect,
  onClose,
  onOpen,
  getHref,
}: UseSearchKeyboardOptions) {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && e.key !== 'Escape') {
      onOpen();
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prev) => (prev < items.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && items[focusedIndex]) {
          const item = items[focusedIndex];
          onSelect(item);
          setFocusedIndex(-1);
          // Programmatically click the Link for navigation using data attribute
          const linkElement = document.querySelector(
            `a[data-product-id="${item.id}"]`,
          ) as HTMLAnchorElement;
          if (linkElement) {
            linkElement.click();
          }
        }
        break;
      case 'Escape':
        onClose();
        inputRef.current?.blur();
        break;
    }
  };

  const resetFocus = () => {
    setFocusedIndex(-1);
  };

  return {
    focusedIndex,
    setFocusedIndex,
    handleKeyDown,
    resetFocus,
    inputRef,
  };
}
