import Link from 'next/link';
import type { Category } from '@/hooks/useCategories';

interface CategoryCardProps {
  category: Category;
}

const categoryImages = {
  "women's clothing": '/assets/images/category/affordable-womens-clothing.jpeg',
  "men's clothing": '/assets/images/category/mens_clothing.jpg',
  electronics: '/assets/images/category/electronics.png',
  jewelery: '/assets/images/category/jewellery.jpg',
};

export const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link
      href={`/products?category=${category.name}`}
      className="group relative shrink-0 w-full overflow-hidden cursor-pointer"
    >
      {/* Category Image - Full height */}
      <div className="relative w-full h-[200px] overflow-hidden bg-gray-200">
        {categoryImages[category.name as keyof typeof categoryImages] ? (
          <img
            src={categoryImages[category.name as keyof typeof categoryImages]}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-200 to-gray-300">
            <span className="text-8xl font-bold text-gray-400 uppercase">
              {category.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* White Overlay at Bottom - Category Name and Shop */}
      <div className="absolute bottom-4 left-0 right-0 bg-white/85 px-4 py-3 flex items-center justify-between">
        <h3 className="text-base lg:text-lg font-semibold text-gray-900 capitalize">
          {category.name}
        </h3>
        <span className="text-[#4A90E2] text-base lg:text-lg font-medium">
          Shop
        </span>
      </div>
    </Link>
  );
};
