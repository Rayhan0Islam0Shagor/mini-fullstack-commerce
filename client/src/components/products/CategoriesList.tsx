'use client';

import { useCategories } from '@/hooks/useCategories';

/**
 * Client Component - Uses SWR for fetching categories
 * Demonstrates CSR (Client-Side Rendering) with SWR
 */
export const CategoriesList = () => {
  const { categories, isLoading, isError, error } = useCategories();

  if (isLoading) {
    return (
      <div className="flex gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 animate-pulse rounded-lg h-32 w-32"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500">
        Error loading categories: {error?.message || 'Unknown error'}
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return <div className="text-gray-500">No categories found</div>;
  }

  return (
    <div className="flex flex-wrap gap-4">
      {categories.map((category) => (
        <div
          key={category._id}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer min-w-[150px]"
        >
          {category.image && (
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-24 object-cover rounded-lg mb-2"
            />
          )}
          <h3 className="text-lg font-semibold">{category.name}</h3>
          {category.description && (
            <p className="text-sm text-gray-600 mt-1">{category.description}</p>
          )}
        </div>
      ))}
    </div>
  );
};
