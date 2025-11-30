import Image from 'next/image';
import Link from 'next/link';
import { FaRegHeart } from 'react-icons/fa6';
import { LuUser } from 'react-icons/lu';
import Container from '@/components/ui/Container';
import CategorySearch from './CategorySearch';
import CartButton from './CartButton';

const Header = () => {
  return (
    <header className="bg-[#03484D] text-white">
      <Container className="flex items-center justify-between py-2">
        <div className="flex items-center gap-6">
          <Link href="/" prefetch={false}>
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
            <CartButton />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
