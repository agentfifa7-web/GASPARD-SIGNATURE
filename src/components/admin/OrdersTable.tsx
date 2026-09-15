"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatFCFA, formatDateFr } from "@/lib/utils";

type Order = {
  id: string;
  name: string;
  phone: string;
  mode: string;
  status: string;
  total: number;
  createdAt: string;
  items: { quantity: number; menuItem: { name: string } }[];
};

const STATUSES = ["RECUE", "PREPARATION", "PRETE", "LIVRAISON", "TERMINEE", "ANNULEE"];

export function OrdersTable({ orders }: { orders: Order[] }) {
  const router = useRouter();
  const [updating, setUpdating] = useState<string | null>(null);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setUpdating(null);
    router.refresh();
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-noir/10 text-left text-xs uppercase tracking-[0.1em] text-noir/50">
            <th className="py-3 pr-4">Client</th>
            <th className="py-3 pr-4">Mode</th>
            <th className="py-3 pr-4">Articles</th>
            <th className="py-3 pr-4">Total</th>
            <th className="py-3 pr-4">Date</th>
            <th className="py-3 pr-4">Statut</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-b border-noir/5">
              <td className="py-3 pr-4">
                <p className="text-noir">{o.name}</p>
                <p className="text-xs text-noir/40">{o.phone}</p>
              </td>
              <td className="py-3 pr-4 text-noir/70">{o.mode.replace("_", " ")}</td>
              <td className="py-3 pr-4 text-noir/70">{o.items.reduce((s, i) => s + i.quantity, 0)}</td>
              <td className="py-3 pr-4 text-noir/70">{formatFCFA(o.total)}</td>
              <td className="py-3 pr-4 text-noir/50">{formatDateFr(o.createdAt)}</td>
              <td className="py-3 pr-4">
                <select
                  value={o.status}
                  disabled={updating === o.id}
                  onChange={(e) => updateStatus(o.id, e.target.value)}
                  className="border border-noir/20 bg-white/60 px-2 py-1.5 text-xs uppercase tracking-[0.05em]"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {orders.length === 0 && <p className="py-10 text-center text-noir/40">Aucune commande.</p>}
    </div>
  );
}
