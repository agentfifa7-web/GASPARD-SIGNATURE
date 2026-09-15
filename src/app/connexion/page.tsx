import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/SectionHeading";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = { title: "Connexion" };

export default function ConnexionPage() {
  return (
    <div className="pb-24 pt-32">
      <Container>
        <div className="mb-12 text-center">
          <span className="text-xs uppercase tracking-[0.35em] text-or">Mon GASPARD</span>
          <h1 className="mt-4 font-display text-4xl text-noir">Connexion</h1>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </Container>
    </div>
  );
}
