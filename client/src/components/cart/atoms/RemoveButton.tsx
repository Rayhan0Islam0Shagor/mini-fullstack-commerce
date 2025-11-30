import { cn } from '@/lib/utils';

interface RemoveButtonProps {
  onClick: () => void;
  className?: string;
}

const RemoveButton = ({ onClick, className = '' }: RemoveButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-red-600 hover:text-red-700 text-xs font-medium transition-colors cursor-pointer',
        className,
      )}
    >
      Remove
    </button>
  );
};

export default RemoveButton;
