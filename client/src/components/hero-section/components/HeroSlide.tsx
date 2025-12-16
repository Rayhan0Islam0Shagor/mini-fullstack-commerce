import { motion, PanInfo } from 'motion/react';
import Container from '../../ui/Container';
import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';
import OfferBadge from './OfferBadge';
import type { HeroSlideContent } from '../types';

interface HeroSlideProps {
  content: HeroSlideContent;
  direction: number;
  onDragEnd: (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
};

const HeroSlide = ({ content, direction, onDragEnd }: HeroSlideProps) => {
  return (
    <motion.div
      key={content.title}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      onDragEnd={onDragEnd}
      className="absolute inset-0 cursor-grab active:cursor-grabbing z-0"
    >
      <HeroBackground banner={content.banner} />

      <Container className="relative h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-center">
          <HeroContent
            title={content.title}
            description={content.description}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative h-full flex items-start justify-center lg:justify-center lg:ml-32"
          >
            <OfferBadge offer={content.offer} />
          </motion.div>
        </div>
      </Container>
    </motion.div>
  );
};

export default HeroSlide;
