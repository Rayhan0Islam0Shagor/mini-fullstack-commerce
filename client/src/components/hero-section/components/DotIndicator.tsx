import { motion } from 'motion/react';

interface DotIndicatorProps {
  isActive: boolean;
  onClick: () => void;
  index: number;
}

const DotIndicator = ({ isActive, onClick, index }: DotIndicatorProps) => {
  return (
    <button
      onClick={onClick}
      className="focus:outline-none cursor-pointer"
      aria-label={`Go to slide ${index + 1}`}
    >
      <motion.div
        className={`h-2 transition-all ${
          isActive
            ? 'w-8 bg-[#0E3B3E] rounded-[3px]'
            : 'w-2 bg-gray-400 rounded-sm'
        }`}
        animate={{
          width: isActive ? 32 : 8,
          backgroundColor: isActive ? '#0E3B3E' : '#9CA3AF',
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.2 }}
      />
    </button>
  );
};

export default DotIndicator;
