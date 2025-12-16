import { forwardRef } from 'react';
import { AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { SearchIcon, ClearButton } from '../atoms';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onClear: () => void;
  className?: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value,
      onChange,
      onFocus,
      onKeyDown,
      placeholder = 'Search...',
      onClear,
      className,
    },
    ref,
  ) => {
    return (
      <div className={cn('flex-1 relative h-full', className)}>
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className={cn(
            'w-full h-full outline-none placeholder:text-[#ABA3A3] px-3 focus:outline-none border-0 text-sm',
            'bg-transparent',
          )}
        />
        <AnimatePresence>
          {value && <ClearButton onClick={onClear} />}
        </AnimatePresence>
      </div>
    );
  },
);

SearchInput.displayName = 'SearchInput';

export default SearchInput;
