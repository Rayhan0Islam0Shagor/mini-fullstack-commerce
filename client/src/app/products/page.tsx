import { prefetchData } from '@/lib/swr-utils';
import { SWRProvider } from '@/providers/SWRProvider';
import { ProductsList } from '@/components/products/ProductsList';
import Container from '@/components/ui/Container';

// Revalidate the page every 60 seconds to get fresh data
export const revalidate = 60;

/**
 * Server Component - Pre-fetches data for SSR
 * This page demonstrates SSR with SWR
 */
export default async function ProductsPage() {
  const fallback = await prefetchData(
    '/product?sort=createdAt&limit=20&page=1',
    { revalidate: 60 },
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
