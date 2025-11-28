import { motion } from 'motion/react';
import HeroTitle from './HeroTitle';
import HeroDescription from './HeroDescription';
import HeroButton from './HeroButton';

interface HeroContentProps {
  title: string;
  description: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

const HeroContent = ({
  title,
  description,
  buttonLabel,
  onButtonClick,
}: HeroContentProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="z-10"
    >
      <HeroTitle title={title} />
      <HeroDescription description={description} />
      <HeroButton label={buttonLabel} onClick={onButtonClick} />
    </motion.div>
  );
};

export default HeroContent;

