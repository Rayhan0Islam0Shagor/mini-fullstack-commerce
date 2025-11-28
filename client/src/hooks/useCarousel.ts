import { useState, useEffect } from 'react';
import { PanInfo } from 'motion/react';

interface UseCarouselProps {
  totalSlides: number;
  autoPlayInterval?: number;
}

const useCarousel = ({ totalSlides, autoPlayInterval = 5000 }: UseCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [totalSlides, autoPlayInterval]);

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const swipe = swipePower(info.offset.x, info.velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    } else if (swipe > swipeConfidenceThreshold) {
      setDirection(-1);
      setCurrentIndex(
        (prev) => (prev - 1 + totalSlides) % totalSlides,
      );
    }
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  return {
    currentIndex,
    direction,
    handleDragEnd,
    goToSlide,
  };
};

export default useCarousel;

