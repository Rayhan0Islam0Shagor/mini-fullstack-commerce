import { FiSearch } from 'react-icons/fi';
import { cn } from '@/lib/utils';

interface SearchButtonProps {
  isLoading?: boolean;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const SearchButton = ({
  isLoading = false,
  onClick,
  className,
  disabled = false,
}: SearchButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        'px-1.5 bg-[#B6B6B6] flex items-center justify-center cursor-pointer rounded-r-[6px]',
        className,
      )}
    >
      {isLoading ? (
        <div className="size-6 flex items-center justify-center">
          <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <FiSearch className="size-6 text-white" />
      )}
    </button>
  );
};

export default SearchButton;
