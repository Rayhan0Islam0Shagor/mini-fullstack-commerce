'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import type { Product } from '@/types/product.types';

const calculateDiscountPrice = (price: number, discount: number): number => {
  return Math.round(price - (price * discount) / 100);
};

interface ProductCard3Props {
  product: Product | undefined;
  animation: {
    initial: { opacity: number; y: number; scale: number };
    animate: { opacity: number; y: number; scale: number };
    exit: { opacity: number; y: number; scale: number };
    transition: { duration: number; delay: number };
  };
}

const ProductCard3 = ({ product, animation }: ProductCard3Props) => {
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
      className="border border-[#0000001C] p-2 md:p-4 grid lg:grid-cols-2 grid-cols-1 gap-2"
    >
      <div className="space-y-2 order-2 lg:order-1">
        <p className="text-4xl">
          <span className="text-[#C82020]">Special</span>
          <br />
          Offer
        </p>
        <div>
          <Link href={`/products/${productTitle}-${productId}`}>
            <h3>{productTitle}</h3>
          </Link>
          <p className="text-[#C82020] text-lg lg:text-[27px]">
            RS. {calculateDiscountPrice(productPrice, 10).toLocaleString()}
          </p>
          <div className="space-y-1 mt-2">
            <p className="text-xs lg:text-sm line-through">
              RS. {productPrice.toLocaleString()}
            </p>

            <p className="text-xs lg:text-base text-[#0AAEB9]">
              Already Sold: {6}
            </p>

            <p className="text-xs lg:text-base text-[#0AAEB9]">
              Available: {productStock}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 order-1 lg:order-2">
        <div className="bg-linear-to-br rounded-full from-[#EE9CA7] to-[#FFDDE1] size-[91px] flex items-center justify-center p-4">
          <span className="text-center text-lg lg:text-2xl">
            Save
            <br />
            10%
          </span>
        </div>
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

export default ProductCard3;
