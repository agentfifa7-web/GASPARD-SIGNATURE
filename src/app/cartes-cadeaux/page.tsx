import type { Metadata } from "next";
import { Container } from "@/components/ui/SectionHeading";
import { GiftCardForm } from "@/components/cartes-cadeaux/GiftCardForm";

export const metadata: Metadata = {
  title: "Cartes cadeaux",
  description: "Offrez une carte cadeau GASPARD Signature : 25 000, 50 000 ou 100 000 FCFA.",
};

export default function CartesCadeauxPage() {
  return (
    <div className="pb-24 pt-32">
      <Container>
        <div className="mb-14 text-center">
          <span className="text-xs uppercase tracking-[0.35em] text-or">Cartes cadeaux</span>
          <h1 className="mt-4 font-display text-4xl text-noir sm:text-5xl">
            Offrez l&apos;expérience GASPARD
          </h1>
          <p className="mx-auto mt-4 max-w-xl font-serif-alt italic text-noir/60">
            Le cadeau parfait pour vos proches : un moment de gourmandise et d&apos;élégance à
            vivre chez GASPARD Signature.
          </p>
        </div>
        <GiftCardForm />
      </Container>
    </div>
  );
}
