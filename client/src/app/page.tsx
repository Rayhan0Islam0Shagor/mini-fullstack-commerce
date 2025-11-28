import BestDeals from '@/components/best-deals';
import HeroSection from '@/components/hero-section';
import NewArrivals from '@/components/new-arrivals';

export default function Home() {
  return (
    <>
      <HeroSection />
      <NewArrivals />
      <BestDeals />
    </>
  );
}
