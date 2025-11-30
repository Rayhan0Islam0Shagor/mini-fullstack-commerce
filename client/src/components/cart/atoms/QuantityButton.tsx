import { cn } from '@/lib/utils';

interface QuantityButtonProps {
  onClick: () => void;
  label: string;
  className?: string;
}

const QuantityButton = ({
  onClick,
  label,
  className = '',
}: QuantityButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-7 h-7 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-sm font-semibold transition-colors cursor-pointer',
        className,
      )}
    >
      {label}
    </button>
  );
};

export default QuantityButton;
