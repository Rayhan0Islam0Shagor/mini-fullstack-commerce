import { prefetchData } from '@/lib/swr-utils';
import { extractProductIdAndTitle } from '@/lib/utils';
import { SWRProvider } from '@/providers/SWRProvider';
import ProductDetails from '@/components/products/ProductDetails';
import Container from '@/components/ui/Container';

// Enable ISR (Incremental Static Regeneration)
// Revalidate the page every 60 seconds to get fresh data
export const revalidate = 60;

const ProductDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const { productId } = extractProductIdAndTitle(id);

  const fallback = await prefetchData(`/product/${productId}`, {
    revalidate: 60,
  });

  return (
    <SWRProvider fallback={fallback}>
      <Container className="py-8">
        <ProductDetails productId={productId} />
      </Container>
    </SWRProvider>
  );
};

export default ProductDetailsPage;
