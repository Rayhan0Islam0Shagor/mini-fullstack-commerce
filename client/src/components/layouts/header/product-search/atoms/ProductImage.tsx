import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProductImageProps {
  src?: string;
  alt: string;
  size?: number;
  className?: string;
}

const ProductImage = ({
  src,
  alt,
  size = 40,
  className,
}: ProductImageProps) => {
  return (
    <div
      className={cn(
        'relative shrink-0 bg-gray-100 rounded overflow-hidden',
        className,
      )}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={`${size}px`}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-xs">
          No Img
        </div>
      )}
    </div>
  );
};

export default ProductImage;
