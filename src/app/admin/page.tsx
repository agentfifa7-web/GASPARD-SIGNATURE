import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { formatFCFA } from "@/lib/utils";
import { CalendarDays, ShoppingBag, Wallet, Users } from "lucide-react";

export const metadata: Metadata = { title: "Admin — Dashboard" };
export const dynamic = "force-dynamic";

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export default async function AdminDashboardPage() {
  const since = startOfToday();

  const [reservationsToday, ordersToday, clientsCount, recentOrders, recentReservations] = await Promise.all([
    prisma.reservation.count({ where: { createdAt: { gte: since } } }),
    prisma.order.findMany({ where: { createdAt: { gte: since } } }),
    prisma.user.count({ where: { role: "CLIENT" } }),
    prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.reservation.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  const caToday = ordersToday.reduce((sum, o) => sum + o.total, 0);

  const kpis = [
    { label: "Réservations aujourd'hui", value: reservationsToday, icon: CalendarDays },
    { label: "Commandes aujourd'hui", value: ordersToday.length, icon: ShoppingBag },
    { label: "CA du jour", value: formatFCFA(caToday), icon: Wallet },
    { label: "Clients", value: clientsCount, icon: Users },
  ];

  return (
    <div>
      <AdminHeader title="Tableau de bord" description="Vue d'ensemble de l'activité GASPARD Signature" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="border border-noir/10 bg-white/40 p-6">
            <kpi.icon className="h-5 w-5 text-or" />
            <p className="mt-4 font-display text-2xl text-noir">{kpi.value}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.1em] text-noir/50">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="border border-noir/10 bg-white/40 p-6">
          <h2 className="font-display text-lg text-noir">Dernières commandes</h2>
          <div className="mt-4 space-y-3">
            {recentOrders.length === 0 && <p className="text-sm text-noir/40">Aucune commande.</p>}
            {recentOrders.map((o) => (
              <div key={o.id} className="flex items-center justify-between text-sm">
                <span className="text-noir/70">{o.name}</span>
                <span className="text-noir/50">{formatFCFA(o.total)}</span>
                <span className="text-or">{o.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-noir/10 bg-white/40 p-6">
          <h2 className="font-display text-lg text-noir">Dernières réservations</h2>
          <div className="mt-4 space-y-3">
            {recentReservations.length === 0 && <p className="text-sm text-noir/40">Aucune réservation.</p>}
            {recentReservations.map((r) => (
              <div key={r.id} className="flex items-center justify-between text-sm">
                <span className="text-noir/70">{r.name}</span>
                <span className="text-noir/50">{r.date} · {r.time}</span>
                <span className="text-or">{r.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
