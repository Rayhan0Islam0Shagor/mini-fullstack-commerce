import Image from 'next/image';
import Link from 'next/link';
import { FaRegHeart } from 'react-icons/fa6';
import { LuUser } from 'react-icons/lu';
import CategorySearch from './CategorySearch';
import Container from '@/components/ui/Container';

const Header = () => {
  return (
    <header className="bg-[#03484D] text-white">
      <Container className="flex items-center justify-between py-2">
        <div className="flex items-center gap-6">
          <Link href="/">
            <Image
              src="/assets/images/logo.png"
              alt="logo"
              width={100}
              height={120}
              className="object-contain h-auto"
            />
          </Link>

          <CategorySearch />
        </div>

        <div className="flex items-center gap-8">
          <div className="-space-y-1 lg:block hidden">
            <span className="text-[9px]">Call Us Now</span>
            <a href="tel:+011 5827918" className="flex items-start gap-0.5">
              <Image
                src="/assets/icons/help.png"
                alt="phone"
                width={19}
                height={19}
                className="object-contain"
              />
              <span className="text-[13px]">+011 5827918</span>
            </a>
            <Link href="/sign-in" className="text-[9px]">
              Sign In
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <LuUser className="size-6 text-white" />
            <FaRegHeart className="size-6 text-white" />
            <button
              type="button"
              className="flex items-center gap-1 cursor-pointer"
              // onClick={() => router.push('/cart')}
              // onKeyDown={(e) => {
              //   if (e.key === 'Enter' || e.key === ' ') {
              //     router.push('/cart');
              //   }
              // }}
            >
              <span className="relative">
                <Image
                  src="/assets/icons/shopping-cart.png"
                  alt="cart"
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <span className="absolute -top-3 left-[11px] text-[#FDDE3B] text-[15px]">
                  3
                </span>
              </span>
              <span className="text-[15px] text-white font-light">Cart</span>
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
