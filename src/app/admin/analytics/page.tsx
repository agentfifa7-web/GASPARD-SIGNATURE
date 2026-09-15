import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { formatFCFA } from "@/lib/utils";
import {
  TopDishesChart,
  PeakHoursChart,
  RevenueTrendChart,
  ClientsPieChart,
} from "@/components/admin/AnalyticsCharts";

export const metadata: Metadata = { title: "Admin — Analytics" };
export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  const [orders, orderItems, users] = await Promise.all([
    prisma.order.findMany(),
    prisma.orderItem.findMany({ include: { menuItem: true } }),
    prisma.user.findMany({ where: { role: "CLIENT" }, include: { _count: { select: { orders: true } } } }),
  ]);

  const dishSales = new Map<string, number>();
  for (const item of orderItems) {
    dishSales.set(item.menuItem.name, (dishSales.get(item.menuItem.name) ?? 0) + item.quantity);
  }
  const topDishes = Array.from(dishSales.entries())
    .map(([name, quantity]) => ({ name, quantity }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 8);

  const hourCounts = new Array(24).fill(0);
  for (const o of orders) {
    hourCounts[o.createdAt.getHours()]++;
  }
  const peakHours = hourCounts
    .map((count, hour) => ({ hour: `${hour}h`, count }))
    .filter((h) => h.count > 0);

  const revenueByDay = new Map<string, number>();
  for (const o of orders) {
    const day = o.createdAt.toISOString().split("T")[0];
    revenueByDay.set(day, (revenueByDay.get(day) ?? 0) + o.total);
  }
  const revenueTrend = Array.from(revenueByDay.entries())
    .map(([day, total]) => ({ day: day.slice(5), total }))
    .sort((a, b) => (a.day < b.day ? -1 : 1));

  const avgBasket = orders.length > 0 ? Math.round(orders.reduce((s, o) => s + o.total, 0) / orders.length) : 0;
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);

  const newClients = users.filter((u) => u._count.orders <= 1).length;
  const loyalClients = users.filter((u) => u._count.orders > 1).length;

  return (
    <div>
      <AdminHeader title="Analytics" description="Performance du restaurant" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="border border-noir/10 bg-white/40 p-6">
          <p className="text-xs uppercase tracking-[0.1em] text-noir/50">Chiffre d&apos;affaires total</p>
          <p className="mt-2 font-display text-2xl text-noir">{formatFCFA(totalRevenue)}</p>
        </div>
        <div className="border border-noir/10 bg-white/40 p-6">
          <p className="text-xs uppercase tracking-[0.1em] text-noir/50">Panier moyen</p>
          <p className="mt-2 font-display text-2xl text-noir">{formatFCFA(avgBasket)}</p>
        </div>
        <div className="border border-noir/10 bg-white/40 p-6">
          <p className="text-xs uppercase tracking-[0.1em] text-noir/50">Commandes totales</p>
          <p className="mt-2 font-display text-2xl text-noir">{orders.length}</p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="border border-noir/10 bg-white/40 p-6">
          <h3 className="font-display text-lg text-noir">Plats les plus vendus</h3>
          <div className="mt-4">
            {topDishes.length > 0 ? <TopDishesChart data={topDishes} /> : <EmptyChart />}
          </div>
        </div>
        <div className="border border-noir/10 bg-white/40 p-6">
          <h3 className="font-display text-lg text-noir">Heures de pointe</h3>
          <div className="mt-4">
            {peakHours.length > 0 ? <PeakHoursChart data={peakHours} /> : <EmptyChart />}
          </div>
        </div>
        <div className="border border-noir/10 bg-white/40 p-6">
          <h3 className="font-display text-lg text-noir">Évolution du chiffre d&apos;affaires</h3>
          <div className="mt-4">
            {revenueTrend.length > 0 ? <RevenueTrendChart data={revenueTrend} /> : <EmptyChart />}
          </div>
        </div>
        <div className="border border-noir/10 bg-white/40 p-6">
          <h3 className="font-display text-lg text-noir">Nouveaux vs clients fidèles</h3>
          <div className="mt-4">
            {users.length > 0 ? (
              <ClientsPieChart
                data={[
                  { name: "Nouveaux clients", value: newClients },
                  { name: "Clients fidèles", value: loyalClients },
                ]}
              />
            ) : (
              <EmptyChart />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyChart() {
  return <p className="py-16 text-center text-sm text-noir/40">Pas encore assez de données.</p>;
}
