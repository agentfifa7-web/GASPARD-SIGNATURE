"use client";

import { motion } from "framer-motion";
import { Scene, type SceneKey } from "@/components/ui/Scene";
import { Container } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

type Img = { id: string; image: string; caption: string };

export function GalleryTeaser({ images }: { images: Img[] }) {
  return (
    <section className="bg-vert-sombre py-20 sm:py-28">
      <Container>
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.35em] text-or-soft">Galerie</span>
          <h2 className="mt-4 font-display text-3xl text-ivoire sm:text-4xl">
            L&apos;expérience GASPARD en images
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={i === 0 ? "col-span-2 row-span-2" : ""}
            >
              <Scene
                scene={img.image as SceneKey}
                className="aspect-square w-full transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href="/galerie" variant="outline" className="text-ivoire">
            Voir toute la galerie
          </Button>
        </div>
      </Container>
    </section>
  );
}
