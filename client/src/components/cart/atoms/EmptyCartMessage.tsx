import { cn } from '@/lib/utils';

interface EmptyCartMessageProps {
  children: React.ReactNode;
  className?: string;
}

const EmptyCartMessage = ({
  children,
  className = '',
}: EmptyCartMessageProps) => {
  return <p className={cn('text-gray-600', className)}>{children}</p>;
};

export default EmptyCartMessage;
