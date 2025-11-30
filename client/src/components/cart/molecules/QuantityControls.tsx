import { QuantityButton, QuantityDisplay } from '../atoms';

interface QuantityControlsProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

const QuantityControls = ({ quantity, onDecrease, onIncrease }: QuantityControlsProps) => {
  return (
    <div className="flex items-center gap-2">
      <QuantityButton onClick={onDecrease} label="-" />
      <QuantityDisplay quantity={quantity} />
      <QuantityButton onClick={onIncrease} label="+" />
    </div>
  );
};

export default QuantityControls;

