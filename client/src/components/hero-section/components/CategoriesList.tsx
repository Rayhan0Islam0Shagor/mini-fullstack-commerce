'use client';

import { useCategories } from '@/hooks/useCategories';
import Container from '../../ui/Container';
import { CategorySlider } from './CategorySlider';

export const CategoriesList = () => {
  const { categories, isLoading, isError } = useCategories();

  if (isLoading) {
    return (
      <section className="pt-20 pb-10 bg-[#F7F1CD]">
        <Container>
          <div className="flex gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="shrink-0 w-full max-w-[280px] bg-gray-200 animate-pulse rounded-lg h-64"
              />
            ))}
          </div>
        </Container>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="pt-20 pb-10 bg-[#F7F1CD]">
        <Container>
          <div className="text-red-500 text-center py-8">
            Error loading categories
          </div>
        </Container>
      </section>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <section className="pt-20 pb-10 bg-[#F7F1CD]">
        <Container>
          <div className="text-gray-500 text-center py-8">
            No categories found
          </div>
        </Container>
      </section>
    );
  }

  return (
    <Container className="relative px-2 pt-20 lg:px-4 pb-10">
      <CategorySlider categories={categories} />

      <div className="absolute bottom-0 left-0 right-0 h-px bg-black/20"></div>
    </Container>
  );
};
