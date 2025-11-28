import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";

interface SocialIconButtonProps {
  icon: IconType;
  label: string;
  href: string;
  className?: string;
}

const SocialIconButton = ({
  icon: Icon,
  label,
  href,
  className,
}: SocialIconButtonProps) => {
  return (
    <a
      aria-label={label}
      href={href}
      className={cn(
        "flex h-8 w-8 items-center justify-center text-white transition hover:bg-[#00B4CC]",
        className,
      )}
    >
      <Icon size={16} />
    </a>
  );
};

export default SocialIconButton;
