"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { X, ChefHat, AlertTriangle, Heart } from "lucide-react";
import { Scene, type SceneKey } from "@/components/ui/Scene";
import { Button } from "@/components/ui/Button";
import { cn, formatFCFA } from "@/lib/utils";
import { useCartStore } from "@/lib/cart-store";
import type { MenuItemData } from "./MenuItemCard";

export function MenuItemModal({ item, onClose }: { item: MenuItemData; onClose: () => void }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [notes, setNotes] = useState("");
  const [added, setAdded] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const toggleFavorite = async () => {
    if (!session?.user) {
      router.push("/connexion?callbackUrl=/la-carte");
      return;
    }
    setFavLoading(true);
    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ menuItemId: item.id }),
      });
      const data = await res.json();
      setFavorited(data.favorited);
    } finally {
      setFavLoading(false);
    }
  };

  const handleAdd = () => {
    addItem({ id: item.id, name: item.name, price: item.price, image: item.image, notes: notes || undefined });
    setAdded(true);
    setTimeout(() => onClose(), 700);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-end justify-center bg-noir/70 backdrop-blur-sm sm:items-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="max-h-[90vh] w-full max-w-lg overflow-y-auto bg-ivoire"
        >
          <div className="relative">
            <Scene scene={item.image as SceneKey} className="aspect-[16/9] w-full" iconClassName="h-14 w-14" />
            <div className="absolute right-4 top-4 flex gap-2">
              <button
                onClick={toggleFavorite}
                disabled={favLoading}
                className="flex h-9 w-9 items-center justify-center bg-noir/70 text-ivoire"
                aria-label="Ajouter aux favoris"
              >
                <Heart className={cn("h-4 w-4", favorited && "fill-or text-or")} />
              </button>
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center bg-noir/70 text-ivoire"
                aria-label="Fermer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {item.chefPick && (
              <span className="absolute left-4 top-4 flex items-center gap-1 bg-noir/85 px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-or">
                <ChefHat className="h-3.5 w-3.5" /> Recommandation du chef
              </span>
            )}
          </div>

          <div className="p-6 sm:p-8">
            <h2 className="font-display text-2xl text-noir">{item.name}</h2>
            <p className="mt-2 text-noir/70">{item.description}</p>
            <p className="mt-4 font-display text-2xl text-or">{formatFCFA(item.price)}</p>

            <div className="mt-6 grid grid-cols-1 gap-4 border-t border-noir/10 pt-6 sm:grid-cols-2">
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-noir/50">Ingrédients</h4>
                <p className="mt-1 text-sm text-noir/70">{item.ingredients}</p>
              </div>
              <div>
                <h4 className="flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-noir/50">
                  <AlertTriangle className="h-3.5 w-3.5" /> Allergènes
                </h4>
                <p className="mt-1 text-sm text-noir/70">{item.allergens || "Aucun allergène majeur"}</p>
              </div>
            </div>

            <div className="mt-6">
              <label className="text-xs uppercase tracking-[0.2em] text-noir/50">
                Personnalisation (optionnel)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex : sans oignons, sauce à part..."
                rows={2}
                className="mt-2 w-full resize-none border border-noir/20 bg-white/60 p-3 text-sm outline-none focus:border-or"
              />
            </div>

            <Button onClick={handleAdd} className="mt-6 w-full" disabled={added}>
              {added ? "Ajouté au panier" : "Ajouter au panier"}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
