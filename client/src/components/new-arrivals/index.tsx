import { SWRProvider } from '@/providers/SWRProvider';
import Container from '../ui/Container';
import { prefetchData } from '@/lib/swr-utils';
import ProductList from './product-list';
import Link from 'next/link';

const NewArrivals = async () => {
  const fallback = await prefetchData('/product?sort=createdAt', {
    revalidate: 60,
  });

  return (
    <section className="bg-white py-10">
      <Container>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl text-black">
            <span className="text-[#20D1DC]">New</span> Arrivals
          </h2>
          <Link href="/products" className="text-sm text-gray-500">
            View All
          </Link>
        </div>
        <SWRProvider fallback={fallback}>
          <ProductList />
        </SWRProvider>
      </Container>
    </section>
  );
};

export default NewArrivals;
