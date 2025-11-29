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
        className={`h-2 transition-all rounded-[3px] ${
          isActive ? 'w-8 bg-[#0E3B3E]' : 'w-4 bg-[#AA9393]'
        }`}
        animate={{
          width: isActive ? 32 : 28,
          backgroundColor: isActive ? '#0E3B3E' : '#AA9393',
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.2 }}
      />
    </button>
  );
};

export default DotIndicator;
