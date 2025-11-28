import type { IconType } from "react-icons";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

export interface FooterContactInfo {
  tagline: string;
  phoneNumbers: string[];
  email: string;
  socials: Array<{
    label: string;
    href: string;
    icon: IconType;
  }>;
}

export interface FooterLinkGroup {
  heading: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}

export interface PaymentMethod {
  label: string;
  image: string;
}

export const FOOTER_CONTACT: FooterContactInfo = {
  tagline: "Got questions? Call us 24/7!",
  phoneNumbers: ["03 111 666 144", "0317 1777015"],
  email: "info@winstore.pk",
  socials: [
    { label: "Facebook", href: "#facebook", icon: FaFacebookF },
    { label: "Twitter", href: "#twitter", icon: FaTwitter },
    { label: "Instagram", href: "#instagram", icon: FaInstagram },
    { label: "LinkedIn", href: "#linkedin", icon: FaLinkedinIn },
  ],
};

export const FOOTER_LINK_GROUPS: FooterLinkGroup[] = [
  {
    heading: "Trending",
    links: [
      { label: "Installments", href: "#" },
      { label: "Electronics", href: "#" },
      { label: "Grocery", href: "#" },
      { label: "Health & Beauty", href: "#" },
      { label: "Home Appliances", href: "#" },
      { label: "Mobile Accessories", href: "#" },
    ],
  },
  {
    heading: "Information",
    links: [
      { label: "About Us", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "FAQs", href: "#" },
      { label: "Shipping & Return", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms & Conditions", href: "#" },
    ],
  },
  {
    heading: "Customer Care",
    links: [
      { label: "My Account", href: "#" },
      { label: "Track Your Order", href: "#" },
      { label: "Recently Viewed", href: "#" },
      { label: "Wishlist", href: "#" },
      { label: "Compare", href: "#" },
      { label: "Become a Vendor", href: "#" },
    ],
  },
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  { label: "Visa", image: "/assets/icons/VISA.png" },
  { label: "MasterCard", image: "/assets/icons/MASTER.png" },
  { label: "Cash On Delivery", image: "/assets/icons/image 128.png" },
  { label: "Easy Instalment Plans", image: "/assets/icons/INSLALLMENTS.png" },
];
