"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { CalendarDays, ShoppingBag, Heart, Award, LogOut } from "lucide-react";
import { Scene, type SceneKey } from "@/components/ui/Scene";
import { Button } from "@/components/ui/Button";
import { cn, formatFCFA, formatDateFr } from "@/lib/utils";

type Reservation = { id: string; date: string; time: string; guests: number; space: string; occasion: string; status: string };
type OrderItem = { id: string; quantity: number; menuItem: { name: string; image: string } };
type Order = { id: string; mode: string; status: string; total: number; createdAt: string; items: OrderItem[] };
type Favorite = { id: string; menuItem: { id: string; name: string; price: number; image: string } };

const TABS = [
  { id: "reservations", label: "Réservations", icon: CalendarDays },
  { id: "commandes", label: "Commandes", icon: ShoppingBag },
  { id: "favoris", label: "Favoris", icon: Heart },
  { id: "fidelite", label: "GASPARD Club", icon: Award },
];

export function AccountDashboard({
  user,
  reservations,
  orders,
  favorites,
}: {
  user: { name: string; email: string; loyaltyPoints: number; birthday: string | null };
  reservations: Reservation[];
  orders: Order[];
  favorites: Favorite[];
}) {
  const [tab, setTab] = useState("reservations");

  return (
    <div>
      <div className="flex flex-col items-center justify-between gap-6 border-b border-noir/10 pb-8 sm:flex-row">
        <div className="text-center sm:text-left">
          <h1 className="font-display text-3xl text-noir">Bonjour, {user.name.split(" ")[0]}</h1>
          <p className="mt-1 text-sm text-noir/50">{user.email}</p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-2 text-sm text-noir/60 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" /> Déconnexion
        </button>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-2 sm:justify-start">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "flex items-center gap-2 border px-4 py-2.5 text-xs uppercase tracking-[0.15em] transition-colors",
              tab === t.id ? "border-or bg-or text-noir" : "border-noir/15 text-noir/60 hover:border-or"
            )}
          >
            <t.icon className="h-4 w-4" /> {t.label}
          </button>
        ))}
      </div>

      <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-10">
        {tab === "reservations" && (
          <div className="space-y-4">
            {reservations.length === 0 && <EmptyState text="Aucune réservation pour le moment." href="/reservation" cta="Réserver une table" />}
            {reservations.map((r) => (
              <div key={r.id} className="flex flex-col justify-between gap-2 border border-noir/10 bg-white/40 p-5 sm:flex-row sm:items-center">
                <div>
                  <p className="font-display text-lg text-noir">{formatDateFr(r.date)} à {r.time}</p>
                  <p className="text-sm text-noir/60">{r.guests} personnes · {r.space} · {r.occasion}</p>
                </div>
                <span className="w-fit border border-or/40 px-3 py-1 text-xs uppercase tracking-[0.1em] text-or">{r.status}</span>
              </div>
            ))}
          </div>
        )}

        {tab === "commandes" && (
          <div className="space-y-4">
            {orders.length === 0 && <EmptyState text="Aucune commande pour le moment." href="/commander" cta="Commander" />}
            {orders.map((o) => (
              <div key={o.id} className="border border-noir/10 bg-white/40 p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-display text-lg text-noir">{formatDateFr(o.createdAt)}</p>
                  <span className="border border-or/40 px-3 py-1 text-xs uppercase tracking-[0.1em] text-or">{o.status}</span>
                </div>
                <p className="mt-1 text-sm text-noir/60">
                  {o.mode.replace("_", " ")} · {o.items.reduce((s, i) => s + i.quantity, 0)} article(s) · {formatFCFA(o.total)}
                </p>
              </div>
            ))}
          </div>
        )}

        {tab === "favoris" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.length === 0 && <EmptyState text="Vous n'avez pas encore de favoris." href="/la-carte" cta="Voir la carte" />}
            {favorites.map((f) => (
              <div key={f.id} className="flex items-center gap-4 border border-noir/10 bg-white/40 p-4">
                <Scene scene={f.menuItem.image as SceneKey} className="h-16 w-16 shrink-0" iconClassName="h-6 w-6" />
                <div>
                  <p className="font-display text-sm text-noir">{f.menuItem.name}</p>
                  <p className="text-sm text-or">{formatFCFA(f.menuItem.price)}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "fidelite" && (
          <div className="border border-or/30 bg-gradient-to-br from-noir to-espresso p-8 text-center text-ivoire">
            <Award className="mx-auto h-10 w-10 text-or" />
            <p className="mt-4 text-sm uppercase tracking-[0.2em] text-or-soft">GASPARD Club</p>
            <p className="mt-2 font-display text-4xl text-ivoire">{user.loyaltyPoints} points</p>
            <p className="mt-4 text-sm text-ivoire/60">
              1 000 pts → dessert offert · 2 500 pts → cocktail offert · 5 000 pts → invitation spéciale
            </p>
            <Button href="/club" variant="outline" className="mt-6 text-ivoire">
              Découvrir le programme
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function EmptyState({ text, href, cta }: { text: string; href: string; cta: string }) {
  return (
    <div className="col-span-full border border-dashed border-noir/20 p-10 text-center">
      <p className="text-noir/50">{text}</p>
      <Button href={href} size="sm" className="mt-4">
        {cta}
      </Button>
    </div>
  );
}
