import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/SectionHeading";
import { Scene, type SceneKey } from "@/components/ui/Scene";
import { RevealSection } from "@/components/pages/RevealSection";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "GASPARD Stories",
  description: "Food, People, Lifestyle, Events, Abidjan — plongez dans l'univers GASPARD Signature.",
};

export const dynamic = "force-dynamic";

export default async function StoriesPage() {
  const stories = await prisma.storyPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="pb-24 pt-32">
      <Container>
        <div className="mb-14 text-center">
          <span className="text-xs uppercase tracking-[0.35em] text-or">GASPARD Stories</span>
          <h1 className="mt-4 font-display text-4xl text-noir sm:text-5xl">
            Le magazine de la maison
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story, i) => (
            <RevealSection key={story.id} delay={(i % 3) * 0.08}>
              <Link href={`/stories/${story.slug}`} className="group block">
                <div className="relative overflow-hidden">
                  <Scene scene={story.image as SceneKey} className="aspect-[4/5] w-full transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 bg-noir/80 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-or">
                    {story.category}
                  </span>
                </div>
                <div className="mt-4 flex items-start justify-between gap-2">
                  <div>
                    <h2 className="font-display text-lg text-noir">{story.title}</h2>
                    <p className="mt-1 text-sm text-noir/60">{story.excerpt}</p>
                  </div>
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-or transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </Link>
            </RevealSection>
          ))}
        </div>
      </Container>
    </div>
  );
}
