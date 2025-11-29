'use client';
import { MdOutlineArrowLeft, MdOutlineArrowRight } from 'react-icons/md';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import type { Category } from '@/hooks/useCategories';

interface CategorySelectorProps {
  categories: Category[];
  isLoading: boolean;
  isError: boolean;
  error: Error | undefined;
  setCurrentCategory: React.Dispatch<React.SetStateAction<string>>;
}

const CategorySelector = ({
  categories,
  isLoading,
  isError,
  error,
  setCurrentCategory,
}: CategorySelectorProps) => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const buttonRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});

  // Initialize the first category when categories are loaded
  useEffect(() => {
    if (categories && categories.length > 0 && currentCategoryIndex === 0) {
      setCurrentCategory(categories[0].name);
    }
  }, [categories, setCurrentCategory, currentCategoryIndex]);

  // Scroll active category into view when index changes
  useEffect(() => {
    const activeButton = buttonRefs.current[currentCategoryIndex];
    if (activeButton) {
      activeButton.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [currentCategoryIndex]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  if (!categories || categories.length === 0) {
    return <div>No categories found</div>;
  }

  const handleChangeCategory = (index: number) => {
    if (index >= 0 && index < categories.length) {
      setCurrentCategoryIndex(index);
      setCurrentCategory(categories[index].name);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-end md:gap-10 gap-4">
      <div className="flex items-center gap-4 max-w-[250px] md:max-w-lg lg:max-w-2xl overflow-x-auto scrollbar-hide">
        {categories.map((category, index) => (
          <button
            key={category._id}
            ref={(el) => {
              buttonRefs.current[index] = el;
            }}
            className={cn(
              'pr-4 py-2 whitespace-nowrap text-sm md:text-base lg:text-xl capitalize text-left transition-all cursor-pointer duration-300 ease-in-out',
              {
                'text-[#00CAD7] font-semibold relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-[#0AAEB9] after:rounded-full':
                  currentCategoryIndex === index,
              },
            )}
            onClick={() => handleChangeCategory(index)}
            type="button"
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="flex items-center -space-x-2 shrink-0">
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => handleChangeCategory(currentCategoryIndex - 1)}
          disabled={currentCategoryIndex === 0}
        >
          <MdOutlineArrowLeft
            className={cn('size-8', {
              'text-gray-400': currentCategoryIndex === 0,
            })}
          />
        </button>
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => handleChangeCategory(currentCategoryIndex + 1)}
          disabled={currentCategoryIndex === categories.length - 1}
        >
          <MdOutlineArrowRight
            className={cn('size-8', {
              'text-gray-400': currentCategoryIndex === categories.length - 1,
            })}
          />
        </button>
      </div>
    </div>
  );
};

export default CategorySelector;
