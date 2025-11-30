import Link from 'next/link';
import { CartItem } from '@/types/cart.types';
import { PriceText, RemoveButton } from '../atoms';
import QuantityControls from './QuantityControls';

interface CartItemInfoProps {
  item: CartItem;
  onClose: () => void;
  onQuantityChange: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

const CartItemInfo = ({
  item,
  onClose,
  onQuantityChange,
  onRemove,
}: CartItemInfoProps) => {
  const handleDecrease = () => {
    onQuantityChange(item?.product?.id, item.quantity - 1);
  };

  const handleIncrease = () => {
    onQuantityChange(item?.product?.id, item.quantity + 1);
  };

  const handleRemove = () => {
    onRemove(item?.product?.id);
  };

  return (
    <div className="flex-1 min-w-0">
      <Link
        href={`/products/${item?.product?.title}-${item?.product?.id}`}
        onClick={onClose}
        className="block"
      >
        <h3 className="font-semibold text-sm mb-1 hover:text-primary-600 line-clamp-2">
          {item?.product?.title}
        </h3>
      </Link>
      <p className="text-primary-600 font-bold text-base mb-2">
        <PriceText price={item?.product?.price} />
      </p>
      <div className="flex items-center justify-between">
        <QuantityControls
          quantity={item.quantity}
          onDecrease={handleDecrease}
          onIncrease={handleIncrease}
        />
        <RemoveButton onClick={handleRemove} />
      </div>
      <div className="flex justify-between items-center">
        <p className="text-right mt-2 font-bold text-sm">
          <PriceText price={item?.product?.price} /> x {item?.quantity}
        </p>
        <p className="text-right mt-2 font-bold text-sm">
          <PriceText price={item?.product?.price * item?.quantity} />
        </p>
      </div>
    </div>
  );
};

export default CartItemInfo;

