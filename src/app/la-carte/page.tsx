import { Suspense } from "react";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/SectionHeading";
import { MenuBrowser } from "@/components/menu/MenuBrowser";

export const metadata: Metadata = {
  title: "La Carte",
  description: "Découvrez la carte GASPARD Signature : pizzas au feu de bois, burgers, grillades, pâtes, poissons, desserts et cocktails.",
};

export const dynamic = "force-dynamic";

export default async function LaCartePage() {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: {
      menuItems: {
        where: { available: true },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  return (
    <div className="pb-24 pt-32">
      <Container>
        <div className="mb-14 text-center">
          <span className="text-xs uppercase tracking-[0.35em] text-or">La Carte</span>
          <h1 className="mt-4 font-display text-4xl text-noir sm:text-5xl">
            Une expérience culinaire, pas un menu
          </h1>
          <p className="mx-auto mt-4 max-w-xl font-serif-alt italic text-noir/60">
            Pizzas au feu de bois, grillades, pâtes fraîches, poissons et créations signature —
            chaque plat est pensé pour l&apos;instant que vous vivez.
          </p>
        </div>

        <Suspense fallback={<div className="py-24 text-center text-noir/40">Chargement de la carte…</div>}>
          <MenuBrowser categories={categories} />
        </Suspense>
      </Container>
    </div>
  );
}
