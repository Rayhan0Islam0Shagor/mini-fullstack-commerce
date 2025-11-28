import { cn } from "@/lib/utils";

interface PaymentBadgeProps {
  label: string;
  caption?: string;
  accent?: string;
  textColor?: string;
}

const PaymentBadge = ({
  label,
  caption,
  accent = "bg-white/10",
  textColor = "text-white",
}: PaymentBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex flex-col rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-wide",
        accent,
        textColor,
      )}
    >
      {label}
      {caption ? (
        <span className="text-[10px] font-normal normal-case">{caption}</span>
      ) : null}
    </span>
  );
};

export default PaymentBadge;
