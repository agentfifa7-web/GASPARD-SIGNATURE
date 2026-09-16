import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Card({
  className,
  interactive = false,
  ...props
}: HTMLAttributes<HTMLDivElement> & { interactive?: boolean }) {
  return (
    <div
      className={cn(
        "border border-noir/10 bg-white/50 shadow-[0_1px_3px_rgba(11,11,11,0.06)] transition-all duration-300",
        interactive &&
          "hover:-translate-y-1 hover:border-or/40 hover:shadow-[0_16px_32px_-16px_rgba(11,11,11,0.25)]",
        className
      )}
      {...props}
    />
  );
}

export function CardDark({
  className,
  interactive = false,
  ...props
}: HTMLAttributes<HTMLDivElement> & { interactive?: boolean }) {
  return (
    <div
      className={cn(
        "border border-ivoire/10 bg-noir/40 shadow-[0_1px_3px_rgba(0,0,0,0.3)] transition-all duration-300",
        interactive &&
          "hover:-translate-y-1 hover:border-or/40 hover:shadow-[0_16px_32px_-16px_rgba(0,0,0,0.6)]",
        className
      )}
      {...props}
    />
  );
}
