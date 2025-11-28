import { motion } from 'motion/react';

interface OfferBadgeProps {
  offer: string;
  delay?: number;
}

const OfferBadge = ({ offer, delay = 0.5 }: OfferBadgeProps) => {
  return (
    <motion.div
      initial={{ scale: 0.8, rotate: -120 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        delay,
        type: 'spring',
        stiffness: 200,
      }}
      className="bg-linear-to-br from-orange-400 to-orange-600 rounded-full w-24 h-24 lg:w-32 lg:h-32 flex items-center justify-center shadow-lg z-10"
    >
      <span className="text-white text-lg lg:text-2xl">{offer}</span>
    </motion.div>
  );
};

export default OfferBadge;
