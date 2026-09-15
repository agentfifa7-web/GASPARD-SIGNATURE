import type { Metadata } from "next";
import { Container } from "@/components/ui/SectionHeading";
import { ReservationForm } from "@/components/reservation/ReservationForm";

export const metadata: Metadata = {
  title: "Réservation",
  description: "Réservez votre table chez GASPARD Signature à Cocody : salle intérieure, terrasse, table romantique ou espace privé.",
};

export default async function ReservationPage({
  searchParams,
}: {
  searchParams: Promise<{ occasion?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="pb-24 pt-32">
      <Container>
        <div className="mb-14 text-center">
          <span className="text-xs uppercase tracking-[0.35em] text-or">Réservation</span>
          <h1 className="mt-4 font-display text-4xl text-noir sm:text-5xl">Réserver une table</h1>
          <p className="mx-auto mt-4 max-w-xl font-serif-alt italic text-noir/60">
            Confirmation instantanée. Pour les groupes de plus de 20 personnes, contactez-nous
            directement.
          </p>
        </div>
        <ReservationForm defaultOccasion={params.occasion} />
      </Container>
    </div>
  );
}
