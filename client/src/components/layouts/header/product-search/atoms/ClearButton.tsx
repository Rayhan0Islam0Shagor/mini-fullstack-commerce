import { motion } from 'motion/react';
import { FiX } from 'react-icons/fi';
import { cn } from '@/lib/utils';

interface ClearButtonProps {
  onClick: () => void;
  className?: string;
}

const ClearButton = ({ onClick, className }: ClearButtonProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.15 }}
      onClick={onClick}
      className={cn(
        'absolute right-2 top-1/2 -translate-y-1/2 text-[#ABA3A3] hover:text-gray-900 z-10 cursor-pointer',
        className,
      )}
      type="button"
    >
      <FiX className="h-4 w-4" />
    </motion.button>
  );
};

export default ClearButton;
