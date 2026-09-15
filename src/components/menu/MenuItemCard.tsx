"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, ChefHat } from "lucide-react";
import { Scene, type SceneKey } from "@/components/ui/Scene";
import { formatFCFA } from "@/lib/utils";
import { useCartStore } from "@/lib/cart-store";
import { MenuItemModal } from "./MenuItemModal";

export type MenuItemData = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  ingredients: string;
  allergens: string;
  chefPick: boolean;
};

export function MenuItemCard({ item, index }: { item: MenuItemData; index: number }) {
  const [open, setOpen] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
        className="group flex flex-col overflow-hidden border border-noir/10 bg-white/40"
      >
        <button
          onClick={() => setOpen(true)}
          className="relative block text-left"
          aria-label={`Voir ${item.name}`}
        >
          <Scene
            scene={item.image as SceneKey}
            className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-105"
          />
          {item.chefPick && (
            <span className="absolute left-3 top-3 flex items-center gap-1 bg-noir/85 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-or">
              <ChefHat className="h-3 w-3" /> Chef
            </span>
          )}
        </button>
        <div className="flex flex-1 flex-col p-5">
          <button onClick={() => setOpen(true)} className="text-left">
            <h3 className="font-display text-lg text-noir">{item.name}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-noir/60">{item.description}</p>
          </button>
          <div className="mt-4 flex items-center justify-between">
            <span className="font-display text-lg text-or">{formatFCFA(item.price)}</span>
            <button
              onClick={() => addItem({ id: item.id, name: item.name, price: item.price, image: item.image })}
              className="flex h-9 w-9 items-center justify-center border border-noir/20 text-noir transition-colors hover:border-or hover:bg-or hover:text-noir"
              aria-label={`Ajouter ${item.name}`}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {open && <MenuItemModal item={item} onClose={() => setOpen(false)} />}
    </>
  );
}
