import { prefetchData } from '@/lib/swr-utils';
import { SWRProvider } from '@/providers/SWRProvider';
import BestDeals from '@/components/best-deals';
import HeroSection from '@/components/hero-section';
import NewArrivals from '@/components/new-arrivals';

// Enable ISR (Incremental Static Regeneration)
// Revalidate the page every 60 seconds to get fresh data
export const revalidate = 60;

export default async function Home() {
  // Pre-fetch categories on the server so all components can access them
  const categoriesFallback = await prefetchData('/category');

  return (
    <SWRProvider fallback={categoriesFallback}>
      <HeroSection />
      <NewArrivals />
      <BestDeals />
    </SWRProvider>
  );
}
