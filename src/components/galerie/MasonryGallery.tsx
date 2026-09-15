"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Scene, type SceneKey } from "@/components/ui/Scene";
import { cn } from "@/lib/utils";

export type GalleryItem = { id: string; category: string; image: string; caption: string };

export function MasonryGallery({ images }: { images: GalleryItem[] }) {
  const categories = useMemo(() => ["Tout", ...Array.from(new Set(images.map((i) => i.category)))], [images]);
  const [active, setActive] = useState("Tout");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filtered = active === "Tout" ? images : images.filter((i) => i.category === active);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={cn(
              "border px-4 py-2 text-xs uppercase tracking-[0.15em] transition-colors",
              active === cat ? "border-or bg-or text-noir" : "border-ivoire/20 text-ivoire/60 hover:border-or"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-10 columns-2 gap-3 sm:columns-3 lg:columns-4 [&>*]:mb-3">
        {filtered.map((img, i) => (
          <motion.button
            key={img.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 8) * 0.05 }}
            onClick={() => setLightbox(img)}
            className="block w-full break-inside-avoid"
          >
            <Scene
              scene={img.image as SceneKey}
              className={cn("w-full transition-transform duration-500 hover:scale-[1.03]", i % 3 === 0 ? "aspect-[3/4]" : "aspect-square")}
            />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-noir/90 p-6"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Scene scene={lightbox.image as SceneKey} className="aspect-[4/3] w-full" iconClassName="h-16 w-16" />
              <p className="mt-4 text-center font-serif-alt italic text-ivoire/80">{lightbox.caption}</p>
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-12 right-0 text-ivoire/70 hover:text-or"
                aria-label="Fermer"
              >
                <X className="h-6 w-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
