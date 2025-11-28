import Link from "next/link";
import { cn } from "@/lib/utils";

interface FooterLinkProps {
  label: string;
  href: string;
  className?: string;
}

const FooterLink = ({ label, href, className }: FooterLinkProps) => {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "text-sm text-white/80 transition hover:text-white",
          className,
        )}
      >
        {label}
      </Link>
    </li>
  );
};

export default FooterLink;
