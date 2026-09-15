"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/commandes", label: "Commandes" },
  { href: "/admin/reservations", label: "Réservations" },
  { href: "/admin/menu", label: "Menu" },
  { href: "/admin/promotions", label: "Promotions" },
  { href: "/admin/evenements", label: "Événements" },
  { href: "/admin/clients", label: "Clients" },
  { href: "/admin/analytics", label: "Analytics" },
];

export function AdminMobileNav() {
  const pathname = usePathname();
  return (
    <div className="sticky top-0 z-30 flex gap-2 overflow-x-auto border-b border-ivoire/10 bg-noir px-4 py-3 lg:hidden">
      {LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "shrink-0 whitespace-nowrap px-3 py-1.5 text-xs uppercase tracking-[0.1em]",
            pathname === link.href ? "bg-or text-noir" : "text-ivoire/60"
          )}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
