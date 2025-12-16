import { FiSearch } from 'react-icons/fi';
import { cn } from '@/lib/utils';

interface SearchIconProps {
  className?: string;
  size?: number;
}

const SearchIcon = ({ className, size = 16 }: SearchIconProps) => {
  return (
    <FiSearch
      className={cn('text-[#ABA3A3] pointer-events-none', className)}
      size={size}
    />
  );
};

export default SearchIcon;
