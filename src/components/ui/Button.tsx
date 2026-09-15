import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-or text-noir hover:bg-or-soft shadow-[0_0_0_1px_rgba(201,169,110,0.3)]",
  secondary: "bg-noir text-ivoire hover:bg-noir-soft",
  ghost: "bg-transparent text-ivoire hover:bg-ivoire/10",
  outline:
    "bg-transparent text-current border border-current/40 hover:border-or hover:text-or",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 uppercase tracking-[0.15em] font-medium transition-all duration-300 rounded-none";

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
  const classes = cn(base, variants[variant], sizes[size], disabled && "opacity-50 pointer-events-none", className);

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
