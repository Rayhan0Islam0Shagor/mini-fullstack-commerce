'use client';
import { useState, useEffect } from 'react';
import { useCategories } from '@/hooks/useCategories';
import Container from '../ui/Container';
import CategorySelector from './category-selector';
import CategoryProducts from './category-products';

const BestDeals = () => {
  // Fetch categories once in the parent component
  const { categories, isLoading, isError, error } = useCategories();
  const [currentCategory, setCurrentCategory] = useState<string>('');

  // Initialize category with first available category
  useEffect(() => {
    if (categories && categories.length > 0 && !currentCategory) {
      setCurrentCategory(categories[0].name);
    }
  }, [categories, currentCategory]);

  return (
    <section className="bg-white py-10">
      <Container>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-2xl text-black whitespace-nowrap shrink-0">
            <span className="text-[#20D1DC]">Best</span> Deals
          </h2>
          <CategorySelector
            categories={categories}
            isLoading={isLoading}
            isError={isError}
            error={error}
            setCurrentCategory={setCurrentCategory}
          />
        </div>

        {currentCategory && (
          <CategoryProducts currentCategory={currentCategory} />
        )}
      </Container>
    </section>
  );
};

export default BestDeals;
