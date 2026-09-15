"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Scene, type SceneKey } from "@/components/ui/Scene";
import { Container } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

type Story = { slug: string; category: string; title: string; excerpt: string; image: string };

export function StoriesTeaser({ stories }: { stories: Story[] }) {
  return (
    <section className="bg-ivoire py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs uppercase tracking-[0.35em] text-or">GASPARD Stories</span>
            <h2 className="mt-4 font-display text-3xl text-noir sm:text-4xl">
              Les dernières histoires de la maison
            </h2>
          </div>
          <Button href="/stories" variant="outline" size="sm">
            Tout lire
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {stories.map((story, i) => (
            <motion.div
              key={story.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link href={`/stories/${story.slug}`} className="group block">
                <div className="relative overflow-hidden">
                  <Scene
                    scene={story.image as SceneKey}
                    className="aspect-[4/5] w-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 bg-noir/80 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-or">
                    {story.category}
                  </span>
                </div>
                <div className="mt-4 flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-lg text-noir">{story.title}</h3>
                    <p className="mt-1 text-sm text-noir/60">{story.excerpt}</p>
                  </div>
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-or transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
