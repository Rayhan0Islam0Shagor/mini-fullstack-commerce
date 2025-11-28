import { cn } from '@/lib/utils';
import type { PaymentMethod } from '../footer-data';
import Image from 'next/image';

interface FooterPaymentsProps {
  methods: PaymentMethod[];
  className?: string;
}

const FooterPayments = ({ methods, className }: FooterPaymentsProps) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between',
        className,
      )}
    >
      <div className="flex flex-wrap gap-3">
        {methods.map((method) => (
          <div
            key={method.label}
            className="bg-white px-2 py-1 rounded-lg flex items-center justify-center"
          >
            <Image
              src={method.image}
              alt={method.label}
              width={100}
              height={100}
              className="object-contain h-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterPayments;
