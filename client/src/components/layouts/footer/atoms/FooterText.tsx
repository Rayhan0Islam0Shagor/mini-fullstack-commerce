import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FooterTextProps {
  children: ReactNode;
  className?: string;
}

const FooterText = ({ children, className }: FooterTextProps) => {
  return <p className={cn("text-sm text-white/80", className)}>{children}</p>;
};

export default FooterText;
