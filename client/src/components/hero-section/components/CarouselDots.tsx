import DotIndicator from './DotIndicator';

interface CarouselDotsProps {
  totalSlides: number;
  currentIndex: number;
  onDotClick: (index: number) => void;
}

const CarouselDots = ({
  totalSlides,
  currentIndex,
  onDotClick,
}: CarouselDotsProps) => {
  return (
    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 z-20">
      <div className="flex justify-center items-center gap-3">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <DotIndicator
            key={index}
            isActive={index === currentIndex}
            onClick={() => onDotClick(index)}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselDots;

