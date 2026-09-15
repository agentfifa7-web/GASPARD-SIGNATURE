"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/lib/cart-store";
import { useMounted } from "@/lib/use-mounted";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/la-carte", label: "La Carte" },
  { href: "/experience", label: "L'Expérience" },
  { href: "/espaces", label: "Nos Espaces" },
  { href: "/evenements", label: "Événements" },
  { href: "/stories", label: "Actualités" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const mounted = useMounted();
  const count = useCartStore((s) => s.count());

  const isHome = pathname === "/";
  const solid = scrolled || !isHome || open;

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid ? "bg-noir/95 backdrop-blur-md shadow-lg shadow-black/20" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="shrink-0 font-display text-xl tracking-[0.1em] text-ivoire">
          GASPARD <span className="text-or italic">Signature</span>
        </Link>

        <div className="flex min-w-0 items-center gap-6 xl:gap-10">
          <nav className="hidden shrink-0 items-center gap-5 xl:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "whitespace-nowrap text-xs uppercase tracking-[0.15em] transition-colors hover:text-or",
                  pathname === link.href ? "text-or" : "text-ivoire/80"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-4">
            <Link
              href="/commander"
              className="relative hidden text-ivoire hover:text-or sm:block"
              aria-label="Panier"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
              {mounted && count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-or text-[10px] font-bold text-noir">
                  {count}
                </span>
              )}
            </Link>
            <Link
              href="/compte"
              className="hidden text-ivoire hover:text-or sm:block"
              aria-label="Mon compte"
            >
              <User className="h-5 w-5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/reservation"
              className="hidden items-center gap-2 whitespace-nowrap border border-or px-5 py-2 text-xs uppercase tracking-[0.2em] text-or transition-colors hover:bg-or hover:text-noir xl:inline-flex"
            >
              Réserver
            </Link>
            <button
              className="text-ivoire xl:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-t border-ivoire/10 bg-noir px-5 pb-8 pt-4 xl:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "border-b border-ivoire/5 py-3 text-sm uppercase tracking-[0.2em]",
                  pathname === link.href ? "text-or" : "text-ivoire/80"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/commander" className="border-b border-ivoire/5 py-3 text-sm uppercase tracking-[0.2em] text-ivoire/80">
              Commander {mounted && count > 0 && `(${count})`}
            </Link>
            <Link href="/compte" className="border-b border-ivoire/5 py-3 text-sm uppercase tracking-[0.2em] text-ivoire/80">
              Mon compte
            </Link>
            <Link
              href="/reservation"
              className="mt-4 inline-flex items-center justify-center border border-or px-5 py-3 text-xs uppercase tracking-[0.2em] text-or"
            >
              Réserver une table
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
