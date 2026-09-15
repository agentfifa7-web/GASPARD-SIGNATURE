"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { MenuItemCard, type MenuItemData } from "./MenuItemCard";

export type MenuCategory = {
  id: string;
  slug: string;
  name: string;
  menuItems: MenuItemData[];
};

export function MenuBrowser({ categories }: { categories: MenuCategory[] }) {
  const searchParams = useSearchParams();
  const initial = searchParams.get("categorie");
  const [active, setActive] = useState(initial && categories.some((c) => c.slug === initial) ? initial : categories[0]?.slug);
  const [lastInitial, setLastInitial] = useState(initial);

  if (initial !== lastInitial) {
    setLastInitial(initial);
    if (initial && categories.some((c) => c.slug === initial)) {
      setActive(initial);
    }
  }

  useEffect(() => {
    if (initial && categories.some((c) => c.slug === initial)) {
      document.getElementById("menu-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial]);

  const current = useMemo(
    () => categories.find((c) => c.slug === active) ?? categories[0],
    [categories, active]
  );

  return (
    <div>
      <div className="sticky top-[72px] z-30 -mx-5 overflow-x-auto border-b border-noir/10 bg-ivoire/95 px-5 py-4 backdrop-blur sm:mx-0 sm:px-0">
        <div className="flex gap-2 sm:flex-wrap sm:justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.slug)}
              className={cn(
                "shrink-0 whitespace-nowrap border px-4 py-2 text-xs uppercase tracking-[0.15em] transition-colors",
                active === cat.slug
                  ? "border-or bg-or text-noir"
                  : "border-noir/15 text-noir/60 hover:border-or hover:text-or"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div id="menu-grid" className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {current?.menuItems.length ? (
          current.menuItems.map((item, i) => <MenuItemCard key={item.id} item={item} index={i} />)
        ) : (
          <p className="col-span-full py-12 text-center text-noir/50">
            Aucun plat disponible dans cette catégorie pour le moment.
          </p>
        )}
      </div>
    </div>
  );
}
