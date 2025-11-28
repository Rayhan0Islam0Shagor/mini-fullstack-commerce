import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import Container from "@/components/ui/Container";

const NAVIGATIONS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Easy Monthly Installments",
    href: "/easy-monthly-installments",
  },
  {
    label: "Shop by Brands",
    href: "/shop-by-brands",
  },
  {
    label: "Become a Vendor",
    href: "/become-a-vendor",
  },
];

const Navbar = () => {
  return (
    <div className="bg-[#0E3B3E] text-white">
      <Container className="py-3 flex items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <button
            type="button"
            className="flex items-center gap-2 text-white cursor-pointer"
          >
            <MdOutlineMenu className="size-5 lg:size-6" />
            <p className="text-sm lg:text-base">Browse By Category</p>
          </button>

          <ul className="lg:flex hidden items-center gap-5">
            {NAVIGATIONS.map((navigation) => (
              <li key={navigation.href}>
                <Link href={navigation.href} className="text-sm font-light">
                  {navigation.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-6 text-white">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF className="size-4 lg:size-6" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="size-4 lg:size-6" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn className="size-4 lg:size-6" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="size-4 lg:size-6" />
          </a>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
