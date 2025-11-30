import { CartItem } from '@/types/cart.types';
import CartItemImage from './CartItemImage';
import CartItemInfo from './CartItemInfo';

interface CartItemRowProps {
  item: CartItem;
  onClose: () => void;
  onQuantityChange: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

const CartItemRow = ({
  item,
  onClose,
  onQuantityChange,
  onRemove,
}: CartItemRowProps) => {
  return (
    <div className="flex gap-3 pb-4 border-b border-gray-200">
      <CartItemImage item={item} onClose={onClose} />
      <CartItemInfo
        item={item}
        onClose={onClose}
        onQuantityChange={onQuantityChange}
        onRemove={onRemove}
      />
    </div>
  );
};

export default CartItemRow;

