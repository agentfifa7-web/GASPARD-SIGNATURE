"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatDateFr } from "@/lib/utils";

type EventCategory = { id: string; name: string; slug: string; description: string };
type EventRequest = {
  id: string;
  type: string;
  guests: number;
  date: string;
  budget: string;
  ambiance: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  createdAt: string;
};

const STATUSES = ["NOUVEAU", "EN_COURS", "PROPOSITION_ENVOYEE", "CONFIRME", "ANNULE"];

function slugify(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function EventsManager({ categories, requests }: { categories: EventCategory[]; requests: EventRequest[] }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const createCategory = async () => {
    setLoading(true);
    await fetch("/api/admin/event-categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, slug: slugify(name), description }),
    });
    setName("");
    setDescription("");
    setLoading(false);
    router.refresh();
  };

  const removeCategory = async (id: string) => {
    if (!confirm("Supprimer cette catégorie ?")) return;
    await fetch(`/api/admin/event-categories/${id}`, { method: "DELETE" });
    router.refresh();
  };

  const updateRequestStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/event-requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.refresh();
  };

  return (
    <div className="space-y-12">
      <div>
        <h3 className="font-display text-lg text-noir">Catégories d&apos;événements</h3>
        <div className="mt-4 border border-noir/10 bg-white/40 p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} className="border border-noir/20 bg-white/70 p-3 text-sm outline-none focus:border-or" />
            <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border border-noir/20 bg-white/70 p-3 text-sm outline-none focus:border-or" />
          </div>
          <Button onClick={createCategory} disabled={loading || !name} className="mt-4" size="sm">
            <Plus className="h-4 w-4" /> Ajouter
          </Button>
        </div>
        <div className="mt-4 space-y-2">
          {categories.map((c) => (
            <div key={c.id} className="flex items-center justify-between border border-noir/10 bg-white/40 p-4">
              <div>
                <p className="font-display text-noir">{c.name}</p>
                <p className="text-sm text-noir/60">{c.description}</p>
              </div>
              <button onClick={() => removeCategory(c.id)} className="text-noir/40 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display text-lg text-noir">Demandes d&apos;événements</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-noir/10 text-left text-xs uppercase tracking-[0.1em] text-noir/50">
                <th className="py-3 pr-4">Contact</th>
                <th className="py-3 pr-4">Type</th>
                <th className="py-3 pr-4">Invités</th>
                <th className="py-3 pr-4">Date</th>
                <th className="py-3 pr-4">Budget</th>
                <th className="py-3 pr-4">Statut</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id} className="border-b border-noir/5">
                  <td className="py-3 pr-4">
                    <p className="text-noir">{r.name}</p>
                    <p className="text-xs text-noir/40">{r.email} · {r.phone}</p>
                  </td>
                  <td className="py-3 pr-4 text-noir/70">{r.type}</td>
                  <td className="py-3 pr-4 text-noir/70">{r.guests}</td>
                  <td className="py-3 pr-4 text-noir/50">{formatDateFr(r.date)}</td>
                  <td className="py-3 pr-4 text-noir/50">{r.budget}</td>
                  <td className="py-3 pr-4">
                    <select
                      value={r.status}
                      onChange={(e) => updateRequestStatus(r.id, e.target.value)}
                      className="border border-noir/20 bg-white/60 px-2 py-1.5 text-xs uppercase tracking-[0.05em]"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s.replace("_", " ")}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-noir/40">
                    Aucune demande.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
