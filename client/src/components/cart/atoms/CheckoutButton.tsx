import { cn } from '@/lib/utils';

interface CheckoutButtonProps {
  onClick?: () => void;
  className?: string;
}

const CheckoutButton = ({ onClick, className = '' }: CheckoutButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'bg-[#0AAEB9] text-white px-4 py-2 rounded cursor-pointer w-full text-lg font-semibold hover:bg-[#0899a3] transition-colors',
        className,
      )}
    >
      Proceed to Checkout
    </button>
  );
};

export default CheckoutButton;
