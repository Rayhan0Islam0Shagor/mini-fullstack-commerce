'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import type { Product } from '@/types/product.types';

const calculateDiscountPrice = (price: number, discount: number): number => {
  return Math.round(price - (price * discount) / 100);
};

interface ProductCard4Props {
  product: Product | undefined;
  animation: {
    initial: { opacity: number; y: number; scale: number };
    animate: { opacity: number; y: number; scale: number };
    exit: { opacity: number; y: number; scale: number };
    transition: { duration: number; delay: number };
  };
}

const ProductCard4 = ({ product, animation }: ProductCard4Props) => {
  if (!product) {
    return null;
  }

  const productTitle = product.title || product.name || 'Product';
  const productId = product.id || product._id;
  const productImage = product.image || '';
  const productPrice = product.price || 0;
  const productStock = product.stock ?? 0;

  return (
    <motion.div
      {...animation}
      className="border border-[#0000001C] p-2 md:p-4 lg:col-start-3 space-y-2 flex flex-col h-full relative"
    >
      <div className="absolute left-4 top-4">
        <p className="text-2xl lg:text-4xl">
          <span className="text-[#C82020]">Special</span>
          <br />
          Offer
        </p>
      </div>

      <div className="bg-linear-to-br rounded-full from-[#F09819] to-[#EDDE5D] size-[91px] flex items-center justify-center p-4 absolute top-10 right-0">
        <span className="text-center text-lg lg:text-2xl">
          Save
          <br />
          10%
        </span>
      </div>

      <Image
        src={productImage}
        alt={productTitle}
        width={200}
        height={200}
        className="w-auto h-[140px] object-contain"
      />

      <div className="flex-1 flex flex-col justify-end">
        <Link href={`/products/${productTitle}-${productId}`}>
          <h3>{productTitle}</h3>
        </Link>
        <div className="flex items-center gap-2">
          <p className="text-[#C1AC3E] text-lg lg:text-[27px]">
            RS. {calculateDiscountPrice(productPrice, 10).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 line-through">
            RS. {Math.round(productPrice).toLocaleString()}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-base text-[#C82020]">Already Sold: {6}</p>
          <p className="text-base text-[#C82020]">Available: {productStock}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard4;
