interface PriceTextProps {
  price: number;
  className?: string;
  showCurrency?: boolean;
}

const PriceText = ({
  price,
  className = '',
  showCurrency = true,
}: PriceTextProps) => {
  return (
    <span className={className}>
      {showCurrency && '৳'}
      {price.toFixed(2)}
    </span>
  );
};

export default PriceText;
