import { cn } from '@/lib/utils';

interface EmptyCartIconProps {
  className?: string;
}

const EmptyCartIcon = ({ className = '' }: EmptyCartIconProps) => {
  return (
    <svg
      className={cn(
        'h-16 w-16 text-[#0AAEB9] stroke-[#0AAEB9] fill-none stroke-2',
        className,
      )}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );
};

export default EmptyCartIcon;
