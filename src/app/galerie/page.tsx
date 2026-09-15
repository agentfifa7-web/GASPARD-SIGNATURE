import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/SectionHeading";
import { MasonryGallery } from "@/components/galerie/MasonryGallery";

export const metadata: Metadata = {
  title: "Galerie",
  description: "Plats, équipe, architecture, événements, pâtisseries et cocktails : la galerie GASPARD Signature.",
};

export const dynamic = "force-dynamic";

export default async function GaleriePage() {
  const images = await prisma.galleryImage.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="bg-vert-sombre pb-24 pt-32">
      <Container>
        <div className="mb-14 text-center">
          <span className="text-xs uppercase tracking-[0.35em] text-or-soft">Galerie</span>
          <h1 className="mt-4 font-display text-4xl text-ivoire sm:text-5xl">
            L&apos;expérience GASPARD en images
          </h1>
        </div>
        <MasonryGallery images={images} />
      </Container>
    </div>
  );
}
