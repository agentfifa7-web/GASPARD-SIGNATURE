"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Coffee, Sun, Heart, Wine, PartyPopper } from "lucide-react";
import { Container } from "@/components/ui/SectionHeading";

const MOMENTS = [
  { icon: Coffee, label: "Petit-déjeuner", href: "/la-carte?categorie=petit-dejeuner" },
  { icon: Sun, label: "Déjeuner", href: "/la-carte?categorie=salades" },
  { icon: Heart, label: "Dîner à deux", href: "/reservation?occasion=Rendez-vous" },
  { icon: Wine, label: "Afterwork", href: "/la-carte?categorie=cocktails" },
  { icon: PartyPopper, label: "Célébration", href: "/evenements" },
];

export function MomentsSelector() {
  return (
    <section className="bg-espresso py-20 sm:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="text-xs uppercase tracking-[0.35em] text-or-soft">
            GASPARD Moments
          </span>
          <h2 className="mt-4 font-display text-3xl text-ivoire sm:text-4xl">
            Quel moment vivez-vous aujourd&apos;hui ?
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {MOMENTS.map((moment, i) => (
            <motion.div
              key={moment.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Link
                href={moment.href}
                className="group flex flex-col items-center gap-4 border border-ivoire/10 bg-noir/30 px-4 py-10 text-center transition-all duration-300 hover:-translate-y-1 hover:border-or hover:bg-noir/60 hover:shadow-[0_20px_40px_-20px_rgba(201,169,110,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-or"
              >
                <moment.icon
                  className="h-8 w-8 text-or transition-transform duration-300 group-hover:scale-110"
                  strokeWidth={1.25}
                />
                <span className="text-xs uppercase tracking-[0.2em] text-ivoire/90">
                  {moment.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
