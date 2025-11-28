import { motion } from 'motion/react';

interface HeroButtonProps {
  label?: string;
  onClick?: () => void;
}

const HeroButton = ({ label = 'View More', onClick }: HeroButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="bg-[#4A90E2] text-white px-8 py-2 rounded-lg font-semibold text-lg hover:bg-[#3a7bc8] transition-colors cursor-pointer"
    >
      {label}
    </motion.button>
  );
};

export default HeroButton;

