'use client';
import { useState } from 'react';
import Container from '../ui/Container';
import CategorySelector from './category-selector';
import CategoryProducts from './category-products';

const BestDeals = () => {
  const [currentCategory, setCurrentCategory] = useState<string>('electronics');

  return (
    <section className="bg-white py-10">
      <Container>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl text-black">
            <span className="text-[#20D1DC]">Best</span> Deals
          </h2>
          <CategorySelector setCurrentCategory={setCurrentCategory} />
        </div>

        <CategoryProducts currentCategory={currentCategory} />
      </Container>
    </section>
  );
};

export default BestDeals;
