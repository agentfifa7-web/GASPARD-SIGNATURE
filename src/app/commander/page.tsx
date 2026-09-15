import type { Metadata } from "next";
import { Container } from "@/components/ui/SectionHeading";
import { CommandeFlow } from "@/components/commande/CommandeFlow";

export const metadata: Metadata = {
  title: "Commander",
  description: "Commandez chez GASPARD Signature : sur place, à emporter ou en livraison.",
};

export default function CommanderPage() {
  return (
    <div className="pb-24 pt-32">
      <Container>
        <div className="mb-14 text-center">
          <span className="text-xs uppercase tracking-[0.35em] text-or">Commander</span>
          <h1 className="mt-4 font-display text-4xl text-noir sm:text-5xl">Commander chez GASPARD</h1>
          <p className="mx-auto mt-4 max-w-xl font-serif-alt italic text-noir/60">
            Sur place, à emporter ou livré chez vous — retrouvez toute la carte GASPARD où que vous
            soyez.
          </p>
        </div>
        <CommandeFlow />
      </Container>
    </div>
  );
}
