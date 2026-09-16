"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Scene } from "@/components/ui/Scene";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;
    videoRef.current?.play().catch(() => {
      // Autoplay can be blocked by the browser; the poster/gradient stays as fallback.
    });
  }, []);

  return (
    <section className="relative flex h-screen min-h-[640px] w-full items-center justify-center overflow-hidden bg-noir">
      <Scene
        scene="hero"
        className="absolute inset-0"
        showIcon={false}
      />

      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        style={{ opacity: videoReady ? 1 : 0, transition: "opacity 1.2s ease" }}
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={() => setVideoReady(true)}
        aria-hidden="true"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      <motion.div
        initial={{ scale: 1.15, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at center, rgba(11,11,11,0.15) 0%, rgba(11,11,11,0.55) 65%, rgba(11,11,11,0.92) 100%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center px-5 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-6 text-xs uppercase tracking-[0.5em] text-or-soft"
        >
          Angré 8e Tranche · Cocody · Abidjan
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-6xl leading-[0.95] text-ivoire sm:text-7xl md:text-8xl"
        >
          GASPARD
          <br />
          <span className="font-serif-alt italic text-or">Signature</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9 }}
          className="mt-8 max-w-lg font-serif-alt text-lg italic text-ivoire/80 sm:text-xl"
        >
          L&apos;art de bien vivre, autour d&apos;une table.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.9 }}
          className="mt-12 flex flex-col gap-4 sm:flex-row"
        >
          <Button href="/reservation" size="lg">
            Réserver une table
          </Button>
          <Button href="/la-carte" variant="outline" size="lg" className="text-ivoire">
            Découvrir la carte
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-ivoire/60"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </motion.div>
    </section>
  );
}
