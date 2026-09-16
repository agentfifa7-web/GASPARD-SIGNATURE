import type { Metadata } from "next";
import { Container } from "@/components/ui/SectionHeading";
import { Scene, type SceneKey } from "@/components/ui/Scene";
import { RevealSection } from "@/components/pages/RevealSection";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Nos Espaces",
  description: "Découvrez les espaces GASPARD Signature : salle intérieure, terrasse, espace de privatisation et événements.",
};

const SPACES: Array<{ title: string; description: string; scene: SceneKey; capacity: string }> = [
  {
    title: "Restaurant",
    description: "Une salle élégante au design sophistiqué, entre noir profond et touches d'or discrètes, pour vos déjeuners comme vos dîners.",
    scene: "interior",
    capacity: "Jusqu'à 80 couverts",
  },
  {
    title: "Terrasse",
    description: "Un cadre en plein air, verdoyant et lumineux, idéal pour profiter des douces soirées d'Abidjan.",
    scene: "terrace",
    capacity: "Jusqu'à 40 couverts",
  },
  {
    title: "Privatisation",
    description: "Un espace modulable pour vos événements privés, anniversaires ou dîners d'affaires en toute confidentialité.",
    scene: "event",
    capacity: "Jusqu'à 30 invités",
  },
  {
    title: "Événements",
    description: "Notre espace polyvalent pensé pour vos soirées, lancements et célébrations avec service traiteur dédié.",
    scene: "cocktail",
    capacity: "Jusqu'à 100 invités",
  },
];

export default function EspacesPage() {
  return (
    <div className="pb-24 pt-32">
      <Container>
        <div className="mb-14 text-center">
          <span className="text-xs uppercase tracking-[0.35em] text-or">Nos Espaces</span>
          <h1 className="mt-4 font-display text-4xl text-noir sm:text-5xl">
            Un cadre pour chaque moment
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-10">
          {SPACES.map((space, i) => (
            <RevealSection key={space.title} delay={i * 0.05}>
              <div className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <Scene
                  scene={space.scene}
                  className="aspect-[16/10] w-full shadow-[0_24px_48px_-24px_rgba(11,11,11,0.35)]"
                  iconClassName="h-16 w-16"
                />
                <div>
                  <h2 className="font-display text-3xl text-noir">{space.title}</h2>
                  <p className="mt-3 text-noir/60">{space.description}</p>
                  <p className="mt-3 text-sm uppercase tracking-[0.15em] text-or">{space.capacity}</p>
                  <div className="mt-6 flex gap-4">
                    <Button href="/reservation" size="sm">Réserver</Button>
                    <Button href="/evenements" variant="outline" size="sm">Privatiser</Button>
                  </div>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </Container>
    </div>
  );
}
