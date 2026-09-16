import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-or text-noir shadow-[0_1px_2px_rgba(11,11,11,0.15)] hover:bg-or-soft hover:shadow-[0_8px_20px_-6px_rgba(201,169,110,0.55)] active:shadow-[0_2px_6px_-2px_rgba(201,169,110,0.4)]",
  secondary:
    "bg-noir text-ivoire shadow-[0_1px_2px_rgba(11,11,11,0.2)] hover:bg-noir-soft hover:shadow-[0_10px_24px_-8px_rgba(11,11,11,0.55)] active:shadow-[0_2px_6px_-2px_rgba(11,11,11,0.4)]",
  ghost: "bg-transparent text-ivoire hover:bg-ivoire/10",
  outline:
    "bg-transparent text-current border border-current/40 hover:border-or hover:text-or hover:bg-or/[0.06] hover:shadow-[0_8px_20px_-10px_rgba(201,169,110,0.4)]",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const base = cn(
  "relative inline-flex items-center justify-center gap-2 rounded-none font-medium uppercase tracking-[0.15em]",
  "transition-all duration-300 ease-out will-change-transform",
  "hover:-translate-y-0.5 active:translate-y-0 active:duration-100",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-or focus-visible:ring-offset-0"
);

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
  disabled,
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}) {
  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    disabled && "pointer-events-none opacity-50 hover:translate-y-0 hover:shadow-none",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
