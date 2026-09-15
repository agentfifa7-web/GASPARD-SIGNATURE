import type { Metadata } from "next";
import { Container } from "@/components/ui/SectionHeading";
import { Scene } from "@/components/ui/Scene";
import { RevealSection } from "@/components/pages/RevealSection";
import { Heart, Sparkles, Users, Leaf } from "lucide-react";

export const metadata: Metadata = {
  title: "L'Expérience",
  description: "Notre histoire, notre cuisine, notre équipe et nos valeurs chez GASPARD Signature.",
};

const VALUES = [
  { icon: Heart, title: "Passion", text: "Chaque plat est préparé avec exigence et amour du produit." },
  { icon: Sparkles, title: "Élégance", text: "Un cadre soigné pensé pour sublimer chaque instant partagé." },
  { icon: Users, title: "Convivialité", text: "GASPARD est une maison ouverte à tous les moments de vie." },
  { icon: Leaf, title: "Fraîcheur", text: "Des produits sélectionnés avec soin, locaux quand c'est possible." },
];

export default function ExperiencePage() {
  return (
    <div className="pb-24">
      <section className="relative flex h-[60vh] min-h-[420px] items-center justify-center bg-noir">
        <Scene scene="interior" className="absolute inset-0" showIcon={false} />
        <div className="absolute inset-0 bg-noir/60" />
        <div className="relative z-10 text-center">
          <span className="text-xs uppercase tracking-[0.35em] text-or-soft">L&apos;Expérience</span>
          <h1 className="mt-4 font-display text-4xl text-ivoire sm:text-5xl">
            Bien plus qu&apos;un restaurant
          </h1>
        </div>
      </section>

      <Container className="mt-20 grid grid-cols-1 gap-16">
        <RevealSection className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="text-xs uppercase tracking-[0.35em] text-or">Notre histoire</span>
            <h2 className="mt-4 font-display text-3xl text-noir">
              Née à Angré, pensée pour Abidjan
            </h2>
            <p className="mt-4 text-noir/60">
              GASPARD Signature est né d&apos;une conviction simple : Abidjan mérite une adresse qui
              mélange les cuisines du monde — pizzas au feu de bois, burgers, grillades, pâtes,
              poissons — dans un cadre à la hauteur des plus belles tables internationales.
              Aujourd&apos;hui, GASPARD est devenu le rendez-vous incontournable de Cocody pour les
              déjeuners d&apos;affaires, les dîners romantiques et les soirées entre amis.
            </p>
          </div>
          <Scene scene="team" className="aspect-[4/3] w-full" iconClassName="h-14 w-14" />
        </RevealSection>

        <RevealSection className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <Scene scene="grill" className="aspect-[4/3] w-full order-2 lg:order-1" iconClassName="h-14 w-14" />
          <div className="order-1 lg:order-2">
            <span className="text-xs uppercase tracking-[0.35em] text-or">Notre cuisine</span>
            <h2 className="mt-4 font-display text-3xl text-noir">
              Une carte sans frontières
            </h2>
            <p className="mt-4 text-noir/60">
              Notre brigade réunit des influences italiennes, américaines, méditerranéennes et
              locales pour composer une carte généreuse : pizzas cuites au feu de bois, burgers
              signature, grillades, pâtes fraîches, poissons du jour et créations exclusives du
              chef, à retrouver sur notre carte digitale.
            </p>
          </div>
        </RevealSection>

        <RevealSection className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="text-xs uppercase tracking-[0.35em] text-or">Notre équipe</span>
            <h2 className="mt-4 font-display text-3xl text-noir">
              Des passionnés à votre service
            </h2>
            <p className="mt-4 text-noir/60">
              En cuisine comme en salle, notre équipe partage la même exigence : vous offrir un
              moment mémorable, du premier accueil au dernier café.
            </p>
          </div>
          <Scene scene="team" className="aspect-[4/3] w-full" iconClassName="h-14 w-14" />
        </RevealSection>

        <RevealSection>
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.35em] text-or">Nos valeurs</span>
            <h2 className="mt-4 font-display text-3xl text-noir">Ce qui nous anime</h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="border border-noir/10 bg-white/40 p-6 text-center">
                <v.icon className="mx-auto h-8 w-8 text-or" strokeWidth={1.25} />
                <h3 className="mt-4 font-display text-lg text-noir">{v.title}</h3>
                <p className="mt-2 text-sm text-noir/60">{v.text}</p>
              </div>
            ))}
          </div>
        </RevealSection>
      </Container>
    </div>
  );
}
