"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/SectionHeading";
import { RESTAURANT } from "@/lib/utils";

type Testimonial = { id: string; author: string; rating: number; content: string };

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="bg-ivoire py-20 sm:py-28">
      <Container>
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.35em] text-or">Ils nous ont fait confiance</span>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-or text-or" />
              ))}
            </div>
            <span className="font-display text-2xl text-noir">{RESTAURANT.rating}/5</span>
          </div>
          <p className="mt-1 text-sm text-noir/50">{RESTAURANT.reviews} avis</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="border border-noir/10 bg-white/40 p-6"
            >
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="h-3.5 w-3.5 fill-or text-or" />
                ))}
              </div>
              <p className="mt-4 font-serif-alt italic text-noir/70">&ldquo;{t.content}&rdquo;</p>
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-noir/50">{t.author}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
