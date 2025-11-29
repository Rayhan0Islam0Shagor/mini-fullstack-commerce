import { prefetchData } from '@/lib/swr-utils';
import { SWRProvider } from '@/providers/SWRProvider';
import { ProductsList } from '@/components/products/ProductsList';
import Container from '@/components/ui/Container';

/**
 * Server Component - Pre-fetches data for SSR
 * This page demonstrates SSR with SWR
 */
export default async function ProductsPage() {
  // Pre-fetch products on the server with the same query params that will be used
  // This ensures the fallback key matches the SWR key (page=1 is added by useInfiniteProducts)
  const fallback = await prefetchData(
    '/product?sort=createdAt&limit=20&page=1',
  );

  return (
    <SWRProvider fallback={fallback}>
      <Container className="py-10">
        <h1 className="text-3xl font-bold mb-6">Products</h1>
        <ProductsList />
      </Container>
    </SWRProvider>
  );
}
