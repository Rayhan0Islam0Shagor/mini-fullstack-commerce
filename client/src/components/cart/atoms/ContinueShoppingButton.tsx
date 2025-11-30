import { cn } from '@/lib/utils';

interface ContinueShoppingButtonProps {
  onClick: () => void;
  className?: string;
}

const ContinueShoppingButton = ({
  onClick,
  className = '',
}: ContinueShoppingButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'bg-[#0AAEB9] text-white px-4 py-2 rounded cursor-pointer hover:bg-[#0899a3] transition-colors',
        className,
      )}
    >
      Continue Shopping
    </button>
  );
};

export default ContinueShoppingButton;
