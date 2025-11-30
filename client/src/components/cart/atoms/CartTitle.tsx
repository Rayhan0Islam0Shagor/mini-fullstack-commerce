import { cn } from '@/lib/utils';

interface CartTitleProps {
  children: React.ReactNode;
  className?: string;
}

const CartTitle = ({ children, className = '' }: CartTitleProps) => {
  return (
    <h2 className={cn('text-xl font-bold text-black', className)}>
      {children}
    </h2>
  );
};

export default CartTitle;
