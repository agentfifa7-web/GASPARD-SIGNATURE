import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/SectionHeading";
import { Scene } from "@/components/ui/Scene";
import { Card } from "@/components/ui/Card";
import { RevealSection } from "@/components/pages/RevealSection";
import { EventRequestForm } from "@/components/evenements/EventRequestForm";

export const metadata: Metadata = {
  title: "Événements",
  description: "GASPARD Events : anniversaires, brunchs, soirées, afterworks, privatisations et événements d'entreprise à Cocody.",
};

export const dynamic = "force-dynamic";

export default async function EvenementsPage() {
  const categories = await prisma.eventCategory.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="pb-24">
      <section className="relative flex h-[55vh] min-h-[400px] items-center justify-center bg-noir">
        <Scene scene="event" className="absolute inset-0" showIcon={false} />
        <div className="absolute inset-0 bg-noir/60" />
        <div className="relative z-10 text-center">
          <span className="text-xs uppercase tracking-[0.35em] text-or-soft">GASPARD Events</span>
          <h1 className="mt-4 font-display text-4xl text-ivoire sm:text-5xl">
            Vos moments, notre signature
          </h1>
        </div>
      </section>

      <Container className="mt-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <RevealSection key={cat.id} delay={i * 0.05}>
              <Card interactive className="group overflow-hidden">
                <Scene scene="event" className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-105" />
                <div className="p-5">
                  <h3 className="font-display text-lg text-noir">{cat.name}</h3>
                  <p className="mt-2 text-sm text-noir/60">{cat.description}</p>
                </div>
              </Card>
            </RevealSection>
          ))}
        </div>

        <div className="mt-20">
          <RevealSection>
            <EventRequestForm eventTypes={categories.map((c) => c.name)} />
          </RevealSection>
        </div>
      </Container>
    </div>
  );
}
