import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
  color?: string;
}

const LoadingSpinner = ({
  size = 20,
  className,
  color = '#ABA3A3',
}: LoadingSpinnerProps) => {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div
        className="rounded-full animate-spin border-2 border-t-transparent"
        style={{
          width: size,
          height: size,
          borderColor: color,
          borderTopColor: 'transparent',
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
