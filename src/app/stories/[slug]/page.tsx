import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/SectionHeading";
import { Scene, type SceneKey } from "@/components/ui/Scene";
import { Button } from "@/components/ui/Button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = await prisma.storyPost.findUnique({ where: { slug } });
  return { title: story?.title ?? "Story", description: story?.excerpt };
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = await prisma.storyPost.findUnique({ where: { slug } });
  if (!story) notFound();

  return (
    <article className="pb-24 pt-32">
      <Container className="max-w-3xl">
        <span className="text-xs uppercase tracking-[0.35em] text-or">{story.category}</span>
        <h1 className="mt-4 font-display text-4xl text-noir sm:text-5xl">{story.title}</h1>
        <p className="mt-3 text-sm text-noir/50">Par {story.author}</p>

        <Scene scene={story.image as SceneKey} className="mt-8 aspect-[16/9] w-full" iconClassName="h-16 w-16" />

        <div className="mt-8 space-y-4 font-serif-alt text-lg leading-relaxed text-noir/80">
          {story.content.split("\n\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-12">
          <Button href="/stories" variant="outline">
            Retour aux stories
          </Button>
        </div>
      </Container>
    </article>
  );
}
