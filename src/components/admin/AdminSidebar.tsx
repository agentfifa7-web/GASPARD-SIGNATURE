"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  ClipboardList,
  CalendarDays,
  UtensilsCrossed,
  Tag,
  PartyPopper,
  Users,
  BarChart3,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/commandes", label: "Commandes", icon: ClipboardList },
  { href: "/admin/reservations", label: "Réservations", icon: CalendarDays },
  { href: "/admin/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/admin/promotions", label: "Promotions", icon: Tag },
  { href: "/admin/evenements", label: "Événements", icon: PartyPopper },
  { href: "/admin/clients", label: "Clients", icon: Users },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-ivoire/10 bg-noir p-6 lg:flex">
      <Link href="/admin" className="font-display text-lg tracking-[0.1em] text-ivoire">
        GASPARD <span className="text-or">Admin</span>
      </Link>

      <nav className="mt-10 flex-1 space-y-1">
        {LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 text-sm transition-colors",
                active ? "bg-or/15 text-or" : "text-ivoire/60 hover:bg-ivoire/5 hover:text-ivoire"
              )}
            >
              <link.icon className="h-4 w-4" /> {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-ivoire/10 pt-4">
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 text-sm text-ivoire/60 hover:text-ivoire">
          <ExternalLink className="h-4 w-4" /> Voir le site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-ivoire/60 hover:text-red-400"
        >
          <LogOut className="h-4 w-4" /> Déconnexion
        </button>
      </div>
    </aside>
  );
}
