"use client";

import { motion } from "framer-motion";
import { Scene, type SceneKey } from "@/components/ui/Scene";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/SectionHeading";
import { formatFCFA } from "@/lib/utils";

export function ChefChoice({
  item,
}: {
  item: { id: string; name: string; description: string; price: number; image: string } | null;
}) {
  if (!item) return null;

  return (
    <section className="bg-noir py-20 sm:py-28">
      <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <Scene scene={item.image as SceneKey} className="aspect-[4/3] w-full" iconClassName="h-16 w-16" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <span className="text-xs uppercase tracking-[0.35em] text-or">
            Le Chef&apos;s Choice
          </span>
          <p className="mt-4 font-serif-alt text-xl italic text-ivoire/70">
            Aujourd&apos;hui, le chef vous recommande…
          </p>
          <h2 className="mt-4 font-display text-4xl text-ivoire sm:text-5xl">{item.name}</h2>
          <p className="mt-4 max-w-md text-ivoire/60">{item.description}</p>
          <p className="mt-6 font-display text-2xl text-or">{formatFCFA(item.price)}</p>
          <Button href="/la-carte" className="mt-8">
            Découvrir
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
