'use client';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CategoryCard } from './CategoryCard';
import type { Category } from '@/hooks/useCategories';
import { ArrowProps } from 'react-multi-carousel/lib/types';

interface CategorySliderProps {
  categories: Category[];
  itemsPerView?: number;
}

// Custom Left Arrow Component
const CustomLeftArrow = ({ onClick }: ArrowProps) => {
  return (
    <button
      onClick={() => onClick?.()}
      className="absolute hidden lg:block -left-2 top-1/2 -translate-y-1/2 z-10 transition-all hover:opacity-80 cursor-pointer"
      aria-label="Previous categories"
    >
      <svg
        className="size-7 text-gray-800"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <span className="sr-only">Previous categories</span>
    </button>
  );
};

// Custom Right Arrow Component
const CustomRightArrow = ({ onClick }: ArrowProps) => {
  return (
    <button
      onClick={() => onClick?.()}
      className="absolute hidden lg:block -right-2 top-1/2 -translate-y-1/2 z-10 transition-all hover:opacity-80 cursor-pointer"
      aria-label="Next categories"
    >
      <svg
        className="size-7 text-gray-800"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
      <span className="sr-only">Next categories</span>
    </button>
  );
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

export const CategorySlider = ({ categories }: CategorySliderProps) => {
  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlay={false}
      autoPlaySpeed={3000}
      centerMode={false}
      customLeftArrow={<CustomLeftArrow />}
      customRightArrow={<CustomRightArrow />}
      draggable
      focusOnSelect={false}
      infinite={true}
      itemClass="lg:px-2 px-1"
      keyBoardControl={true}
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={true}
      responsive={responsive}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      {categories.map((category) => (
        <div key={category._id}>
          <CategoryCard category={category} />
        </div>
      ))}
    </Carousel>
  );
};
