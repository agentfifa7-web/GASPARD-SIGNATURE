import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFCFA(amount: number) {
  return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA";
}

export function formatDateFr(date: string | Date) {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(d);
}

export const RESTAURANT = {
  name: "GASPARD Signature",
  tagline: "L'art de bien vivre, autour d'une table.",
  address: "Angré 8e Tranche, Cocody, Abidjan",
  phone: "+225 07 00 00 00 00",
  whatsapp: "22507000000",
  email: "contact@gaspard-signature.ci",
  hoursShort: "Ouvert tous les jours · 08h00 – 02h00",
  rating: 4.4,
  reviews: 355,
  instagram: "https://instagram.com/gaspardsignature",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Gaspard+Signature+Angre+8e+Tranche+Cocody",
  wazeUrl: "https://waze.com/ul?q=Gaspard%20Signature%20Angre%208e%20Tranche%20Cocody",
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${RESTAURANT.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
