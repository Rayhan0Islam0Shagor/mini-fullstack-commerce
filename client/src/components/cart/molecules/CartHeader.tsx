import { CloseButton, CartTitle } from '../atoms';

interface CartHeaderProps {
  onClose: () => void;
}

const CartHeader = ({ onClose }: CartHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <CartTitle>Shopping Cart</CartTitle>
      <CloseButton onClick={onClose} />
    </div>
  );
};

export default CartHeader;

