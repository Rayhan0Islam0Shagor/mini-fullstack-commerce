import Image from 'next/image';
import Link from 'next/link';
import { CartItem } from '@/types/cart.types';

interface CartItemImageProps {
  item: CartItem;
  onClose: () => void;
}

const CartItemImage = ({ item, onClose }: CartItemImageProps) => {
  return (
    <Link
      href={`/products/${item?.product?.title}-${item?.product?.id}`}
      onClick={onClose}
      className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0"
    >
      <Image
        src={item?.product?.image || ''}
        alt={item?.product?.title || ''}
        fill
        className="object-cover"
        sizes="80px"
      />
    </Link>
  );
};

export default CartItemImage;

