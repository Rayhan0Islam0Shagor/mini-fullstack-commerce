import {
  EmptyCartIcon,
  EmptyCartMessage,
  ContinueShoppingButton,
} from '../atoms';

interface EmptyCartStateProps {
  onClose: () => void;
}

const EmptyCartState = ({ onClose }: EmptyCartStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4">
      <EmptyCartIcon />
      <EmptyCartMessage>Your cart is empty</EmptyCartMessage>
      <ContinueShoppingButton onClick={onClose} />
    </div>
  );
};

export default EmptyCartState;
