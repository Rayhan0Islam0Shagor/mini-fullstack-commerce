'use client';
import { useProductsByCategory } from '@/hooks/useProducts';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { useMemo } from 'react';

const calculateDiscountPrice = (price: number, discount: number): number => {
  return Math.round(price - (price * discount) / 100);
};

const CategoryProducts = ({
  currentCategory,
}: {
  currentCategory: string | null;
}) => {
  const { products, isLoading, isError, error } =
    useProductsByCategory(currentCategory);

  // Memoize products to prevent unnecessary re-renders
  const productsKey = useMemo(
    () => (products ? products.map((p) => p._id).join(',') : ''),
    [products],
  );

  // Loading skeleton with animation
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="grid grid-cols-3 grid-rows-2 gap-4 mt-6"
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="border border-[#0000001C] p-4 bg-gray-100 animate-pulse h-[300px]"
          />
        ))}
      </motion.div>
    );
  }

  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-500 text-center py-8"
      >
        Error: {error?.message}
      </motion.div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-gray-500 text-center py-8"
      >
        No products found
      </motion.div>
    );
  }

  // Ensure we have at least 5 products
  if (products.length < 5) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-gray-500 text-center py-8"
      >
        Not enough products to display
      </motion.div>
    );
  }

  // Animation configuration
  const containerAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  };

  const itemAnimation = (index: number) => ({
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
    },
    transition: {
      duration: 0.3,
      delay: index * 0.1,
    },
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={productsKey}
        {...containerAnimation}
        className="grid grid-cols-3 grid-rows-2 gap-4 mt-6"
      >
        <motion.div
          {...itemAnimation(0)}
          className="border border-[#0000001C] p-4 grid grid-cols-2 gap-2"
        >
          <div className="space-y-4">
            <div>
              <Link href={`/products/${products[0].title}-${products[0].id}`}>
                <h3>{products[0].title}</h3>
              </Link>
              <p className="text-[#00CAD7] text-[27px]">
                RS.{' '}
                {calculateDiscountPrice(products[0].price, 10).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 line-through">
                RS. {products[0].price.toLocaleString()}
              </p>
            </div>

            <div className="bg-linear-to-br from-[#00C9FF] to-[#92FE9D] w-[137px] h-[91px] flex items-center justify-center">
              <span className="text-center text-2xl">
                Save
                <br />
                10%
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-3xl text-center">
              <span className="text-[#00CAD7]">Special</span>
              <br />
              Offer
            </p>
            <Image
              src={products[0].image || ''}
              alt={products[0].title || ''}
              width={120}
              height={120}
              className="w-auto h-[120px] object-contain"
            />
          </div>
        </motion.div>
        <motion.div
          {...itemAnimation(1)}
          className="border border-[#0000001C] p-4 row-span-2 flex flex-col gap-2 relative"
        >
          <div className="bg-linear-to-br rounded-full from-[#FF512F] to-[#DD2476] size-[91px] flex items-center justify-center p-4 absolute top-20 right-0">
            <span className="text-center text-2xl">
              Save
              <br />
              10%
            </span>
          </div>

          <div className="absolute left-4 top-4">
            <p className="text-4xl">
              <span className="text-[#C82020]">Special</span>
              <br />
              Offer
            </p>
          </div>

          <div className="flex flex-col items-center justify-center flex-1">
            <Image
              src={products[4].image || ''}
              alt={products[4].title || ''}
              width={460}
              height={400}
              className="w-full h-[400px] object-contain"
            />
          </div>

          <div>
            <Link href={`/products/${products[4].title}-${products[4].id}`}>
              <h3>{products[4].title}</h3>
            </Link>
            <p className="text-[#00CAD7] text-lg">
              RS. {Math.round(products[4].price).toLocaleString()}
            </p>
          </div>
        </motion.div>
        <motion.div
          {...itemAnimation(2)}
          className="border border-[#0000001C] p-4 grid grid-cols-2 gap-2"
        >
          <div className="space-y-4">
            <div>
              <Link href={`/products/${products[1].title}-${products[1].id}`}>
                <h3>{products[1].title}</h3>
              </Link>
              <p className="text-[#00CAD7] text-lg">
                RS.{' '}
                {calculateDiscountPrice(products[1].price, 10).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 line-through">
                RS. {products[1].price.toLocaleString()}
              </p>
            </div>

            <div className="bg-linear-to-br from-[#CC95C0] via-[#DBD4B4] to-[#7AA1D2] w-[137px] h-[91px] flex items-center justify-center">
              <span className="text-center text-2xl">
                Save
                <br />
                10%
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-3xl text-center">
              <span className="text-[#0E3B3E]">Special</span>
              <br />
              Offer
            </p>
            <Image
              src={products[1].image || ''}
              alt={products[1].title || ''}
              width={120}
              height={120}
              className="w-auto h-[120px] object-contain"
            />
          </div>
        </motion.div>
        <motion.div
          {...itemAnimation(3)}
          className="border border-[#0000001C] p-4 grid grid-cols-2 gap-4"
        >
          <div className="space-y-2">
            <p className="text-4xl">
              <span className="text-[#C82020]">Special</span>
              <br />
              Offer
            </p>
            <div>
              <Link href={`/products/${products[2].title}-${products[2].id}`}>
                <h3>{products[2].title}</h3>
              </Link>
              <p className="text-[#C82020] text-lg">
                RS.{' '}
                {calculateDiscountPrice(products[2].price, 10).toLocaleString()}
              </p>
              <div className="space-y-1 mt-2">
                <p className="text-sm line-through">
                  RS. {products[2].price.toLocaleString()}
                </p>

                <p className="text-base text-[#0AAEB9]">Already Sold: {6}</p>

                <p className="text-base text-[#0AAEB9]">
                  Available: {products[2].stock}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="bg-linear-to-br rounded-full from-[#EE9CA7] to-[#FFDDE1] size-[91px] flex items-center justify-center p-4">
              <span className="text-center text-2xl">
                Save
                <br />
                10%
              </span>
            </div>
            <Image
              src={products[2].image || ''}
              alt={products[2].title || ''}
              width={120}
              height={120}
              className="w-auto h-[120px] object-contain"
            />
          </div>
        </motion.div>
        <motion.div
          {...itemAnimation(4)}
          className="border border-[#0000001C] p-4 col-start-3 space-y-2 flex flex-col h-full relative"
        >
          <div className="absolute left-4 top-4">
            <p className="text-4xl">
              <span className="text-[#C82020]">Special</span>
              <br />
              Offer
            </p>
          </div>

          <div className="bg-linear-to-br rounded-full from-[#F09819] to-[#EDDE5D] size-[91px] flex items-center justify-center p-4 absolute top-10 right-0">
            <span className="text-center text-2xl">
              Save
              <br />
              10%
            </span>
          </div>

          <Image
            src={products[3].image || ''}
            alt={products[3].title || ''}
            width={200}
            height={200}
            className="w-auto h-[140px] object-contain"
          />

          <div className="flex-1 flex flex-col justify-end">
            <Link href={`/products/${products[3].title}-${products[3].id}`}>
              <h3>{products[3].title}</h3>
            </Link>
            <div className="flex items-center gap-2">
              <p className="text-[#C1AC3E] text-lg">
                RS.{' '}
                {calculateDiscountPrice(products[3].price, 10).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 line-through">
                RS. {Math.round(products[3].price).toLocaleString()}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <p className="text-base text-[#C82020]">Already Sold: {6}</p>
              <p className="text-base text-[#C82020]">
                Available: {products[3].stock}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CategoryProducts;
