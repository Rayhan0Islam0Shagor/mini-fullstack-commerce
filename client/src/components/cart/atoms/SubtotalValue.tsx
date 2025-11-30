import { cn } from '@/lib/utils';
import PriceText from './PriceText';

interface SubtotalValueProps {
  value: number;
  className?: string;
}

const SubtotalValue = ({ value, className = '' }: SubtotalValueProps) => {
  return (
    <PriceText price={value} className={cn('font-bold text-lg', className)} />
  );
};

export default SubtotalValue;
