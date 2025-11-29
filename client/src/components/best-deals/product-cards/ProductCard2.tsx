'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import type { Product } from '@/types/product.types';

const calculateDiscountPrice = (price: number, discount: number): number => {
  return Math.round(price - (price * discount) / 100);
};

interface ProductCard2Props {
  product: Product | undefined;
  animation: {
    initial: { opacity: number; y: number; scale: number };
    animate: { opacity: number; y: number; scale: number };
    exit: { opacity: number; y: number; scale: number };
    transition: { duration: number; delay: number };
  };
}

const ProductCard2 = ({ product, animation }: ProductCard2Props) => {
  if (!product) {
    return null;
  }

  const productTitle = product.title || product.name || 'Product';
  const productId = product.id || product._id;
  const productImage = product.image || '';
  const productPrice = product.price || 0;

  return (
    <motion.div
      {...animation}
      className="border border-[#0000001C] p-2 md:p-4 grid lg:grid-cols-2 grid-cols-1 gap-2"
    >
      <div className="space-y-4 order-2 lg:order-1">
        <div>
          <Link href={`/products/${productTitle}-${productId}`}>
            <h3>{productTitle}</h3>
          </Link>
          <p className="text-[#00CAD7] text-lg lg:text-[27px]">
            RS. {calculateDiscountPrice(productPrice, 10).toLocaleString()}
          </p>
          <p className="text-xs lg:text-sm text-gray-500 line-through">
            RS. {productPrice.toLocaleString()}
          </p>
        </div>

        <div className="bg-linear-to-br from-[#CC95C0] via-[#DBD4B4] to-[#7AA1D2] w-[137px] h-[91px] flex items-center justify-center">
          <span className="text-center text-lg lg:text-2xl">
            Save
            <br />
            10%
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 order-1 lg:order-2">
        <p className="text-2xl lg:text-3xl text-center">
          <span className="text-[#0E3B3E]">Special</span>
          <br />
          Offer
        </p>
        <Image
          src={productImage}
          alt={productTitle}
          width={120}
          height={120}
          className="w-auto h-auto lg:h-[120px] object-contain"
        />
      </div>
    </motion.div>
  );
};

export default ProductCard2;
