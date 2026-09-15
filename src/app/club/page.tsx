import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/SectionHeading";
import { Scene } from "@/components/ui/Scene";
import { RevealSection } from "@/components/pages/RevealSection";
import { Button } from "@/components/ui/Button";
import { Award, Gift, Martini, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "GASPARD Club",
  description: "Le programme de fidélité GASPARD Signature : cumulez des points à chaque visite et débloquez des récompenses exclusives.",
};

const TIERS = [
  { points: 1000, icon: Gift, reward: "Un dessert offert" },
  { points: 2500, icon: Martini, reward: "Un cocktail signature offert" },
  { points: 5000, icon: Sparkles, reward: "Une invitation à un événement exclusif" },
];

export default async function ClubPage() {
  const session = await auth();
  const user = session?.user?.id
    ? await prisma.user.findUnique({ where: { id: session.user.id } })
    : null;

  const points = user?.loyaltyPoints ?? 0;

  return (
    <div className="pb-24">
      <section className="relative flex h-[50vh] min-h-[380px] items-center justify-center bg-noir">
        <Scene scene="cocktail" className="absolute inset-0" showIcon={false} />
        <div className="absolute inset-0 bg-noir/65" />
        <div className="relative z-10 text-center">
          <Award className="mx-auto h-10 w-10 text-or" />
          <span className="mt-4 block text-xs uppercase tracking-[0.35em] text-or-soft">GASPARD Club</span>
          <h1 className="mt-4 font-display text-4xl text-ivoire sm:text-5xl">
            Chaque visite compte
          </h1>
        </div>
      </section>

      <Container className="mt-20">
        {user && (
          <RevealSection className="mb-16 border border-or/30 bg-gradient-to-br from-noir to-espresso p-8 text-center text-ivoire">
            <p className="text-xs uppercase tracking-[0.2em] text-or-soft">Votre solde</p>
            <p className="mt-2 font-display text-5xl text-or">{points} pts</p>
          </RevealSection>
        )}

        <RevealSection>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {TIERS.map((tier) => (
              <div
                key={tier.points}
                className={cn(
                  "border p-8 text-center transition-colors",
                  points >= tier.points ? "border-or bg-or/10" : "border-noir/10 bg-white/40"
                )}
              >
                <tier.icon className="mx-auto h-8 w-8 text-or" strokeWidth={1.25} />
                <p className="mt-4 font-display text-2xl text-noir">{tier.points} points</p>
                <p className="mt-2 text-sm text-noir/60">{tier.reward}</p>
                {points >= tier.points && (
                  <span className="mt-4 inline-block text-xs uppercase tracking-[0.15em] text-or">Débloqué</span>
                )}
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection className="mt-16 text-center">
          <h2 className="font-display text-2xl text-noir">Comment ça marche ?</h2>
          <p className="mx-auto mt-3 max-w-xl text-noir/60">
            Chaque commande et chaque réservation honorée vous rapporte des points GASPARD.
            Connectez-vous à votre espace Mon GASPARD pour suivre votre solde et échanger vos
            récompenses.
          </p>
          {!user && (
            <div className="mt-6 flex justify-center gap-4">
              <Button href="/inscription">Rejoindre le Club</Button>
              <Button href="/connexion" variant="outline">Se connecter</Button>
            </div>
          )}
        </RevealSection>
      </Container>
    </div>
  );
}
