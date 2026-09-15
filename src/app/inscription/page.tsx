import type { Metadata } from "next";
import { Container } from "@/components/ui/SectionHeading";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = { title: "Créer un compte" };

export default function InscriptionPage() {
  return (
    <div className="pb-24 pt-32">
      <Container>
        <div className="mb-12 text-center">
          <span className="text-xs uppercase tracking-[0.35em] text-or">Mon GASPARD</span>
          <h1 className="mt-4 font-display text-4xl text-noir">Créer un compte</h1>
        </div>
        <RegisterForm />
      </Container>
    </div>
  );
}
