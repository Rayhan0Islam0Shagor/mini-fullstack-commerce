import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FooterHeadingProps {
  children: ReactNode;
  className?: string;
}

const FooterHeading = ({ children, className }: FooterHeadingProps) => {
  return (
    <p
      className={cn(
        "text-[#00B4CC] text-sm font-semibold uppercase tracking-wide",
        className,
      )}
    >
      {children}
    </p>
  );
};

export default FooterHeading;
