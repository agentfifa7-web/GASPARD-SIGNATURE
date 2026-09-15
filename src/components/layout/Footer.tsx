import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/ui/BrandIcons";
import { Container } from "@/components/ui/SectionHeading";
import { RESTAURANT } from "@/lib/utils";

const COLUMNS = [
  {
    title: "Découvrir",
    links: [
      { href: "/la-carte", label: "La Carte" },
      { href: "/experience", label: "L'Expérience" },
      { href: "/espaces", label: "Nos Espaces" },
      { href: "/galerie", label: "Galerie" },
      { href: "/stories", label: "GASPARD Stories" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/reservation", label: "Réservation" },
      { href: "/commander", label: "Commander" },
      { href: "/evenements", label: "Événements privés" },
      { href: "/club", label: "GASPARD Club" },
      { href: "/cartes-cadeaux", label: "Cartes cadeaux" },
    ],
  },
  {
    title: "Compte",
    links: [
      { href: "/compte", label: "Mon GASPARD" },
      { href: "/connexion", label: "Connexion" },
      { href: "/inscription", label: "Créer un compte" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-noir text-ivoire">
      <Container className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link href="/" className="font-display text-2xl tracking-[0.1em]">
            GASPARD <span className="text-or italic">Signature</span>
          </Link>
          <p className="mt-4 max-w-sm font-serif-alt italic text-ivoire/60">
            {RESTAURANT.tagline}
          </p>
          <div className="mt-6 flex items-center gap-4">
            <a
              href={RESTAURANT.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center border border-ivoire/20 text-ivoire/70 transition-colors hover:border-or hover:text-or"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center border border-ivoire/20 text-ivoire/70 transition-colors hover:border-or hover:text-or"
              aria-label="Facebook"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="text-xs uppercase tracking-[0.25em] text-or">{col.title}</h3>
            <ul className="mt-5 space-y-3">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivoire/70 transition-colors hover:text-ivoire"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-xs uppercase tracking-[0.25em] text-or">Infos pratiques</h3>
          <ul className="mt-5 space-y-3 text-sm text-ivoire/70">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-or" />
              {RESTAURANT.address}
            </li>
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-or" />
              {RESTAURANT.hoursShort}
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-or" />
              {RESTAURANT.phone}
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-or" />
              {RESTAURANT.email}
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-ivoire/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-ivoire/40 sm:flex-row">
          <p>© {new Date().getFullYear()} GASPARD Signature. Tous droits réservés.</p>
          <p>Angré 8e Tranche, Cocody — Abidjan</p>
        </Container>
      </div>
    </footer>
  );
}
