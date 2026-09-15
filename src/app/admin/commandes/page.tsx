import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { OrdersTable } from "@/components/admin/OrdersTable";

export const metadata: Metadata = { title: "Admin — Commandes" };
export const dynamic = "force-dynamic";

export default async function AdminCommandesPage() {
  const orders = await prisma.order.findMany({
    include: { items: { include: { menuItem: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <AdminHeader title="Commandes" description="Suivi en temps réel des commandes" />
      <OrdersTable
        orders={orders.map((o) => ({
          id: o.id,
          name: o.name,
          phone: o.phone,
          mode: o.mode,
          status: o.status,
          total: o.total,
          createdAt: o.createdAt.toISOString(),
          items: o.items.map((i) => ({ quantity: i.quantity, menuItem: { name: i.menuItem.name } })),
        }))}
      />
    </div>
  );
}
