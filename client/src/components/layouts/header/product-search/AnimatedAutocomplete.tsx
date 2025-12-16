'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useClickOutside } from '@/hooks/useClickOutside';
import { SearchInput, SearchDropdown } from './molecules';
import { SearchButton } from './atoms';
import { useProductSearch, useSearchKeyboard } from './hooks';
import type { Product } from '@/types/product.types';

interface AnimatedAutocompleteProps {
  placeholder?: string;
  onSelect?: (item: Product) => void;
  className?: string;
  debounceMs?: number;
  limit?: number;
}

export function AnimatedAutocomplete({
  placeholder = 'Search...',
  onSelect,
  className,
  debounceMs = 500,
  limit = 10,
}: AnimatedAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { query, setQuery, items, isLoading } = useProductSearch({
    debounceMs,
    limit,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when query becomes empty
  useEffect(() => {
    if (!query.trim()) {
      setIsOpen(false);
    }
  }, [query]);

  const getHref = (item: Product) => {
    const title = item.title || item.name || 'Product';
    return `/products/${encodeURIComponent(title)}-${item.id}`;
  };

  const { focusedIndex, setFocusedIndex, handleKeyDown, resetFocus } =
    useSearchKeyboard({
      items,
      isOpen,
      onSelect: (item) => {
        setQuery(item.title || item.name || '');
        setIsOpen(false);
        onSelect?.(item);
      },
      onClose: () => setIsOpen(false),
      onOpen: () => setIsOpen(true),
      getHref,
    });

  useClickOutside(containerRef, () => {
    setIsOpen(false);
  });

  const handleInputChange = (value: string) => {
    setQuery(value);
    if (value.trim()) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
    resetFocus();
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleSelect = (item: Product) => {
    setQuery(item.title || item.name || '');
    setIsOpen(false);
    onSelect?.(item);
  };

  return (
    <div ref={containerRef} className={cn('relative w-full h-full', className)}>
      <div className="flex-1 flex items-stretch relative h-full">
        <SearchInput
          ref={inputRef}
          value={query}
          onChange={handleInputChange}
          onFocus={() => {
            if (query.trim()) {
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          onClear={handleClear}
        />
        <SearchButton isLoading={isLoading} />
      </div>

      <SearchDropdown
        isOpen={isOpen}
        isLoading={isLoading}
        items={items}
        query={query}
        focusedIndex={focusedIndex}
        onSelect={handleSelect}
        onItemFocus={setFocusedIndex}
        getHref={getHref}
      />
    </div>
  );
}
