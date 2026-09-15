import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Container } from "@/components/ui/SectionHeading";
import { Scene } from "@/components/ui/Scene";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/contact/ContactForm";
import { RESTAURANT, whatsappLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez GASPARD Signature à Angré 8e Tranche, Cocody — téléphone, WhatsApp, email et itinéraire.",
};

export default function ContactPage() {
  return (
    <div className="pb-24 pt-32">
      <Container>
        <div className="mb-14 text-center">
          <span className="text-xs uppercase tracking-[0.35em] text-or">Contact</span>
          <h1 className="mt-4 font-display text-4xl text-noir sm:text-5xl">Parlons-en</h1>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <Scene scene="interior" className="aspect-[4/3] w-full" iconClassName="h-14 w-14" />
            <div className="mt-6 space-y-4">
              <p className="flex items-start gap-3 text-noir/70">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-or" /> {RESTAURANT.address}
              </p>
              <p className="flex items-start gap-3 text-noir/70">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-or" /> {RESTAURANT.hoursShort}
              </p>
              <p className="flex items-start gap-3 text-noir/70">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-or" /> {RESTAURANT.phone}
              </p>
              <p className="flex items-start gap-3 text-noir/70">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-or" /> {RESTAURANT.email}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button href={RESTAURANT.mapsUrl}>M&apos;y rendre</Button>
              <Button href={RESTAURANT.wazeUrl} variant="outline">Ouvrir Waze</Button>
              <Button href={whatsappLink()} variant="outline">WhatsApp</Button>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl text-noir">Envoyez-nous un message</h2>
            <p className="mt-2 text-sm text-noir/60">
              Pour toute question, demande spéciale ou partenariat.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
