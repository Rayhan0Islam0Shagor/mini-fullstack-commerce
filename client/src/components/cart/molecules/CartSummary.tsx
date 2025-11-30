import { SubtotalLabel, SubtotalValue, CheckoutButton } from '../atoms';

interface CartSummaryProps {
  subtotal: number;
  onCheckout?: () => void;
}

const CartSummary = ({ subtotal, onCheckout }: CartSummaryProps) => {
  return (
    <div className="border-t border-gray-200 p-4 bg-gray-50">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <SubtotalLabel>Subtotal</SubtotalLabel>
          <SubtotalValue value={subtotal} />
        </div>
      </div>
      <CheckoutButton onClick={onCheckout} />
    </div>
  );
};

export default CartSummary;

