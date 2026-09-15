import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/AdminHeader";

export const metadata: Metadata = { title: "Admin — Clients" };
export const dynamic = "force-dynamic";

export default async function AdminClientsPage() {
  const clients = await prisma.user.findMany({
    where: { role: "CLIENT" },
    include: { _count: { select: { orders: true, reservations: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <AdminHeader title="Clients" description="Base clients GASPARD Signature" />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-noir/10 text-left text-xs uppercase tracking-[0.1em] text-noir/50">
              <th className="py-3 pr-4">Nom</th>
              <th className="py-3 pr-4">Contact</th>
              <th className="py-3 pr-4">Commandes</th>
              <th className="py-3 pr-4">Réservations</th>
              <th className="py-3 pr-4">Points fidélité</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id} className="border-b border-noir/5">
                <td className="py-3 pr-4 text-noir">{c.name}</td>
                <td className="py-3 pr-4 text-noir/60">
                  {c.email}
                  {c.phone && <span className="block text-xs text-noir/40">{c.phone}</span>}
                </td>
                <td className="py-3 pr-4 text-noir/60">{c._count.orders}</td>
                <td className="py-3 pr-4 text-noir/60">{c._count.reservations}</td>
                <td className="py-3 pr-4 text-or">{c.loyaltyPoints} pts</td>
              </tr>
            ))}
            {clients.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-noir/40">
                  Aucun client pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
