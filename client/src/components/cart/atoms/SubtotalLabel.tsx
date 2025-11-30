import { cn } from '@/lib/utils';

interface SubtotalLabelProps {
  children: React.ReactNode;
  className?: string;
}

const SubtotalLabel = ({ children, className = '' }: SubtotalLabelProps) => {
  return <span className={cn('text-gray-600', className)}>{children}</span>;
};

export default SubtotalLabel;
