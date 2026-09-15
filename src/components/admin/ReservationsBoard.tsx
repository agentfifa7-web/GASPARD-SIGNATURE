"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { formatDateFr } from "@/lib/utils";

type Reservation = {
  id: string;
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  occasion: string;
  space: string;
  status: string;
};

const STATUSES = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"];

export function ReservationsBoard({ reservations }: { reservations: Reservation[] }) {
  const router = useRouter();
  const [updating, setUpdating] = useState<string | null>(null);

  const grouped = useMemo(() => {
    const map = new Map<string, Reservation[]>();
    for (const r of reservations) {
      const list = map.get(r.date) ?? [];
      list.push(r);
      map.set(r.date, list);
    }
    return Array.from(map.entries()).sort((a, b) => (a[0] < b[0] ? 1 : -1));
  }, [reservations]);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    await fetch(`/api/admin/reservations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setUpdating(null);
    router.refresh();
  };

  if (reservations.length === 0) {
    return <p className="py-10 text-center text-noir/40">Aucune réservation.</p>;
  }

  return (
    <div className="space-y-8">
      {grouped.map(([date, list]) => (
        <div key={date}>
          <h3 className="font-display text-lg text-noir">{formatDateFr(date)}</h3>
          <div className="mt-3 space-y-2">
            {list.map((r) => (
              <div key={r.id} className="flex flex-wrap items-center justify-between gap-3 border border-noir/10 bg-white/40 p-4">
                <div>
                  <p className="text-noir">{r.name} · {r.guests} pers.</p>
                  <p className="text-xs text-noir/40">{r.time} · {r.space} · {r.occasion} · {r.phone}</p>
                </div>
                <select
                  value={r.status}
                  disabled={updating === r.id}
                  onChange={(e) => updateStatus(r.id, e.target.value)}
                  className="border border-noir/20 bg-white/60 px-2 py-1.5 text-xs uppercase tracking-[0.05em]"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
