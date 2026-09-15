"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Star, Eye, EyeOff, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatFCFA, cn } from "@/lib/utils";

const SCENE_OPTIONS = [
  "pizza", "burger", "pasta", "grill", "fish", "salad", "dessert",
  "pastry", "breakfast", "cocktail", "wine", "soup",
];

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  ingredients: string;
  allergens: string;
  chefPick: boolean;
  available: boolean;
  categoryId: string;
};

type Category = { id: string; name: string; slug: string; menuItems: MenuItem[] };

const emptyForm = {
  name: "",
  description: "",
  price: "",
  image: "signature",
  ingredients: "",
  allergens: "",
  chefPick: false,
  available: true,
  categoryId: "",
};

export function MenuManager({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ ...emptyForm, categoryId: categories[0]?.id ?? "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createItem = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/menu-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setForm({ ...emptyForm, categoryId: categories[0]?.id ?? "" });
      setShowForm(false);
      router.refresh();
    } catch {
      setError("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  const patchItem = async (id: string, data: Partial<MenuItem>) => {
    await fetch(`/api/admin/menu-items/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    router.refresh();
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Supprimer ce plat ?")) return;
    await fetch(`/api/admin/menu-items/${id}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <div>
      <div className="mb-6 flex justify-end">
        <Button onClick={() => setShowForm((v) => !v)} size="sm">
          <Plus className="h-4 w-4" /> {showForm ? "Fermer" : "Ajouter un plat"}
        </Button>
      </div>

      {showForm && (
        <div className="relative mb-10 border border-or/30 bg-white/50 p-6">
          <button onClick={() => setShowForm(false)} className="absolute right-4 top-4 text-noir/40 hover:text-noir">
            <X className="h-4 w-4" />
          </button>
          <h3 className="font-display text-lg text-noir">Nouveau plat</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              placeholder="Nom du plat"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border border-noir/20 bg-white/70 p-3 text-sm outline-none focus:border-or"
            />
            <input
              type="number"
              placeholder="Prix (FCFA)"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="border border-noir/20 bg-white/70 p-3 text-sm outline-none focus:border-or"
            />
            <select
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              className="border border-noir/20 bg-white/70 p-3 text-sm outline-none focus:border-or"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <select
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="border border-noir/20 bg-white/70 p-3 text-sm outline-none focus:border-or"
            >
              {SCENE_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  Visuel : {s}
                </option>
              ))}
            </select>
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
              className="sm:col-span-2 resize-none border border-noir/20 bg-white/70 p-3 text-sm outline-none focus:border-or"
            />
            <input
              placeholder="Ingrédients"
              value={form.ingredients}
              onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
              className="border border-noir/20 bg-white/70 p-3 text-sm outline-none focus:border-or"
            />
            <input
              placeholder="Allergènes"
              value={form.allergens}
              onChange={(e) => setForm({ ...form, allergens: e.target.value })}
              className="border border-noir/20 bg-white/70 p-3 text-sm outline-none focus:border-or"
            />
          </div>
          <label className="mt-4 flex items-center gap-2 text-sm text-noir/70">
            <input
              type="checkbox"
              checked={form.chefPick}
              onChange={(e) => setForm({ ...form, chefPick: e.target.checked })}
            />
            Recommandation du chef
          </label>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          <Button onClick={createItem} disabled={loading || !form.name || !form.price} className="mt-5">
            {loading ? "Ajout…" : "Ajouter le plat"}
          </Button>
        </div>
      )}

      <div className="space-y-10">
        {categories.map((cat) => (
          <div key={cat.id}>
            <h3 className="font-display text-lg text-noir">{cat.name}</h3>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <tbody>
                  {cat.menuItems.map((item) => (
                    <tr key={item.id} className="border-b border-noir/5">
                      <td className="py-3 pr-4 text-noir">
                        <div className="flex items-center gap-2">
                          {item.chefPick && <Star className="h-3.5 w-3.5 fill-or text-or" />}
                          {item.name}
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-noir/60">{formatFCFA(item.price)}</td>
                      <td className="py-3 pr-4">
                        <button
                          onClick={() => patchItem(item.id, { available: !item.available })}
                          className={cn(
                            "flex items-center gap-1 text-xs uppercase tracking-[0.1em]",
                            item.available ? "text-or" : "text-noir/30"
                          )}
                        >
                          {item.available ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                          {item.available ? "Disponible" : "Masqué"}
                        </button>
                      </td>
                      <td className="py-3 pr-4">
                        <button
                          onClick={() => patchItem(item.id, { chefPick: !item.chefPick })}
                          className="text-xs uppercase tracking-[0.1em] text-noir/50 hover:text-or"
                        >
                          {item.chefPick ? "Retirer chef" : "Chef's choice"}
                        </button>
                      </td>
                      <td className="py-3 pr-4 text-right">
                        <button onClick={() => deleteItem(item.id)} className="text-noir/40 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {cat.menuItems.length === 0 && (
                    <tr>
                      <td className="py-4 text-noir/40" colSpan={4}>
                        Aucun plat dans cette catégorie.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
