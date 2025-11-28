import HeroCarousel from './components/HeroCarousel';
import Categories from './categories';
import type { HeroSlideContent } from './types';

const HERO_SECTION_CONTENT: HeroSlideContent[] = [
  {
    title: "Shop 'Computer & experience'",
    description:
      'You cannot inspect quality into the product; it is already there. I am not a product of my circumstances. I am a product of my decisions.',
    banner: '/assets/images/banner.png',
    offer: '40% Off',
  },
  {
    title: "Shop 'Tablet & Smartphones'",
    description:
      'You cannot inspect quality into the product; it is already there. I am not a product of my circumstances. I am a product of my decisions.',
    banner: '/assets/images/banner.png',
    offer: '30% Off',
  },
  {
    title: "Shop 'Accessories & More'",
    description:
      'You cannot inspect quality into the product; it is already there. I am not a product of my circumstances. I am a product of my decisions.',
    banner: '/assets/images/banner.png',
    offer: '20% Off',
  },
];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[#F7F1CD] to-[#F8F4DE] pb-10">
      <HeroCarousel slides={HERO_SECTION_CONTENT} autoPlayInterval={5000} />
      <Categories />
    </section>
  );
};

export default HeroSection;
