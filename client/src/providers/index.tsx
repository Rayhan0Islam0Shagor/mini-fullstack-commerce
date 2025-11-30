'use client';
import { CartProvider } from '@/contexts/cart-context';
import { SWRProvider } from './SWRProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRProvider>
      <CartProvider>{children}</CartProvider>
    </SWRProvider>
  );
};

export default Providers;
