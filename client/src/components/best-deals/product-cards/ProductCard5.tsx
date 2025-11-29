'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import type { Product } from '@/types/product.types';

interface ProductCard5Props {
  product: Product | undefined;
  animation: {
    initial: { opacity: number; y: number; scale: number };
    animate: { opacity: number; y: number; scale: number };
    exit: { opacity: number; y: number; scale: number };
    transition: { duration: number; delay: number };
  };
}

const ProductCard5 = ({ product, animation }: ProductCard5Props) => {
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
      className="border border-[#0000001C] p-2 md:p-4 lg:row-span-2 row-span-1 flex flex-col gap-2 relative"
    >
      <div className="bg-linear-to-br rounded-full from-[#FF512F] to-[#DD2476] size-[91px] flex items-center justify-center p-4 absolute top-20 right-0">
        <span className="text-center text-lg lg:text-2xl">
          Save
          <br />
          10%
        </span>
      </div>

      <div className="absolute left-4 top-4">
        <p className="text-2xl lg:text-4xl">
          <span className="text-[#C82020]">Special</span>
          <br />
          Offer
        </p>
      </div>

      <div className="flex flex-col items-center justify-center flex-1">
        <Image
          src={productImage}
          alt={productTitle}
          width={460}
          height={400}
          className="w-full h-[400px] object-contain"
        />
      </div>

      <div>
        <Link href={`/products/${productTitle}-${productId}`}>
          <h3>{productTitle}</h3>
        </Link>
        <p className="text-[#00CAD7] text-lg">
          RS. {Math.round(productPrice).toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard5;
