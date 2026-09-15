"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { Container } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Scene } from "@/components/ui/Scene";
import { RESTAURANT, whatsappLink } from "@/lib/utils";

export function LocationCTA() {
  return (
    <section className="bg-espresso py-20 sm:py-28">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs uppercase tracking-[0.35em] text-or-soft">Nous trouver</span>
          <h2 className="mt-4 font-display text-3xl text-ivoire sm:text-4xl">
            Venez vivre l&apos;expérience GASPARD
          </h2>
          <p className="mt-4 flex items-start gap-2 text-ivoire/70">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-or" />
            {RESTAURANT.address}
          </p>
          <p className="mt-2 text-ivoire/60">{RESTAURANT.hoursShort}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={RESTAURANT.mapsUrl}>M&apos;y rendre</Button>
            <Button href={whatsappLink()} variant="outline" className="text-ivoire">
              WhatsApp
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex flex-col justify-center gap-4 border border-ivoire/10 bg-noir/40 p-8"
        >
          <div className="flex items-center gap-3">
            <InstagramIcon className="h-5 w-5 text-or" />
            <span className="text-sm uppercase tracking-[0.2em] text-ivoire/80">
              @gaspardsignature
            </span>
          </div>
          <p className="font-serif-alt italic text-ivoire/60">
            Suivez nos coulisses, nos soirées et nos nouveautés en exclusivité sur Instagram.
          </p>
          <div className="grid grid-cols-3 gap-2">
            {(["pizza", "cocktail", "grill"] as const).map((s) => (
              <Scene key={s} scene={s} className="aspect-square w-full" iconClassName="h-5 w-5" />
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
