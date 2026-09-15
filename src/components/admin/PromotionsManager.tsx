"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Promotion = { id: string; title: string; description: string; active: boolean };

export function PromotionsManager({ promotions }: { promotions: Promotion[] }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const create = async () => {
    setLoading(true);
    await fetch("/api/admin/promotions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    setTitle("");
    setDescription("");
    setLoading(false);
    router.refresh();
  };

  const toggle = async (id: string, active: boolean) => {
    await fetch(`/api/admin/promotions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !active }),
    });
    router.refresh();
  };

  const remove = async (id: string) => {
    if (!confirm("Supprimer cette promotion ?")) return;
    await fetch(`/api/admin/promotions/${id}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <div>
      <div className="mb-8 border border-noir/10 bg-white/40 p-6">
        <h3 className="font-display text-lg text-noir">Créer une offre</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            placeholder="Titre (ex: Mardi Pizza)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-noir/20 bg-white/70 p-3 text-sm outline-none focus:border-or"
          />
          <input
            placeholder="Description (ex: -20% sur les pizzas chaque mardi)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-noir/20 bg-white/70 p-3 text-sm outline-none focus:border-or"
          />
        </div>
        <Button onClick={create} disabled={loading || !title || !description} className="mt-4" size="sm">
          <Plus className="h-4 w-4" /> Créer
        </Button>
      </div>

      <div className="space-y-3">
        {promotions.map((p) => (
          <div key={p.id} className="flex items-center justify-between gap-4 border border-noir/10 bg-white/40 p-4">
            <div>
              <p className="font-display text-noir">{p.title}</p>
              <p className="text-sm text-noir/60">{p.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggle(p.id, p.active)}
                className={cn("border px-3 py-1.5 text-xs uppercase tracking-[0.1em]", p.active ? "border-or bg-or text-noir" : "border-noir/20 text-noir/50")}
              >
                {p.active ? "Active" : "Inactive"}
              </button>
              <button onClick={() => remove(p.id)} className="text-noir/40 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {promotions.length === 0 && <p className="text-center text-noir/40">Aucune promotion.</p>}
      </div>
    </div>
  );
}
