import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'motion/react';

interface QuantityDisplayProps {
  quantity: number;
  className?: string;
}

const QuantityDisplay = ({ quantity, className }: QuantityDisplayProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={quantity}
        className={cn('font-semibold w-8 text-center text-sm', className)}
        initial={{ scale: 0.5, y: 5 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.5, y: -5 }}
        transition={{
          duration: 0.2,
          ease: 'easeOut',
        }}
      >
        {quantity}
      </motion.span>
    </AnimatePresence>
  );
};

export default QuantityDisplay;
