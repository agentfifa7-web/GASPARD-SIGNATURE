import { prisma } from "@/lib/prisma";
import { Hero } from "@/components/home/Hero";
import { MomentsSelector } from "@/components/home/MomentsSelector";
import { ChefChoice } from "@/components/home/ChefChoice";
import { StoriesTeaser } from "@/components/home/StoriesTeaser";
import { GalleryTeaser } from "@/components/home/GalleryTeaser";
import { Testimonials } from "@/components/home/Testimonials";
import { LocationCTA } from "@/components/home/LocationCTA";

export default async function HomePage() {
  const [chefPick, stories, gallery, testimonials] = await Promise.all([
    prisma.menuItem.findFirst({ where: { chefPick: true, available: true } }),
    prisma.storyPost.findMany({ take: 3, orderBy: { createdAt: "desc" } }),
    prisma.galleryImage.findMany({ take: 8, orderBy: { order: "asc" } }),
    prisma.testimonial.findMany({ take: 4, orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <>
      <Hero />
      <MomentsSelector />
      <ChefChoice item={chefPick} />
      <StoriesTeaser stories={stories} />
      <GalleryTeaser images={gallery} />
      <Testimonials testimonials={testimonials} />
      <LocationCTA />
    </>
  );
}
