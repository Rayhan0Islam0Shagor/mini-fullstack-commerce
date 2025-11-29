'use client';
import { MdOutlineArrowLeft, MdOutlineArrowRight } from 'react-icons/md';
import { useState, useEffect } from 'react';
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

  // Initialize the first category when categories are loaded
  useEffect(() => {
    if (categories && categories.length > 0 && currentCategoryIndex === 0) {
      setCurrentCategory(categories[0].name);
    }
  }, [categories, setCurrentCategory, currentCategoryIndex]);

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
    setCurrentCategoryIndex(index);
    setCurrentCategory(categories[index].name);
  };

  return (
    <div className="flex-1 flex items-center justify-end gap-10">
      <div className="flex items-center gap-4">
        {categories.map((category, index) => (
          <button
            key={category._id}
            className={cn(
              'pr-4 py-2 text-xl capitalize text-left transition-all duration-300 ease-in-out',
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

      <div className="flex items-center -space-x-2">
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
