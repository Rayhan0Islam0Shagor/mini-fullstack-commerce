'use client';

import { AnimatePresence } from 'motion/react';
import HeroSlide from './HeroSlide';
import CarouselDots from './CarouselDots';
import type { HeroSlideContent } from '../types';
import useCarousel from '@/hooks/useCarousel';

interface HeroCarouselProps {
  slides: HeroSlideContent[];
  autoPlayInterval?: number;
}

const HeroCarousel = ({
  slides,
  autoPlayInterval = 5000,
}: HeroCarouselProps) => {
  const { currentIndex, direction, handleDragEnd, goToSlide } = useCarousel({
    totalSlides: slides.length,
    autoPlayInterval,
  });

  return (
    <div className="relative h-[400px] lg:h-[400px] w-full">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <HeroSlide
          key={currentIndex}
          content={slides[currentIndex]}
          direction={direction}
          onDragEnd={handleDragEnd}
        />
      </AnimatePresence>

      <CarouselDots
        totalSlides={slides.length}
        currentIndex={currentIndex}
        onDotClick={goToSlide}
      />
    </div>
  );
};

export default HeroCarousel;
