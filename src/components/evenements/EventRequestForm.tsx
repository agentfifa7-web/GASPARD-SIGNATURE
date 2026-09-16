"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn, formatFCFA } from "@/lib/utils";

const AMBIANCES = ["Élégante & feutrée", "Festive & musicale", "Décontractée", "Romantique"];
const BUDGETS = ["< 300 000 FCFA", "300 000 – 700 000 FCFA", "700 000 – 1 500 000 FCFA", "> 1 500 000 FCFA"];

const pill = (active: boolean) =>
  cn(
    "border px-3 py-1.5 text-xs transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-or",
    active
      ? "border-or bg-or text-noir shadow-[0_8px_20px_-10px_rgba(201,169,110,0.6)]"
      : "border-noir/15 text-noir/60 hover:-translate-y-0.5 hover:border-or/50 hover:text-noir"
  );

export function EventRequestForm({ eventTypes }: { eventTypes: string[] }) {
  const [type, setType] = useState(eventTypes[0] ?? "Anniversaire");
  const [guests, setGuests] = useState(20);
  const [date, setDate] = useState("");
  const [budget, setBudget] = useState(BUDGETS[0]);
  const [ambiance, setAmbiance] = useState(AMBIANCES[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/event-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, guests, date, budget, ambiance, name, email, phone }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
    } catch {
      setError("Une erreur est survenue, merci de réessayer.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border border-or/40 bg-white/50 p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-or/20">
          <Check className="h-7 w-7 text-or" />
        </div>
        <h3 className="mt-6 font-display text-xl text-noir">Demande envoyée !</h3>
        <p className="mt-3 text-noir/60">
          Notre équipe événementiel revient vers vous sous 24h avec une proposition sur-mesure pour
          votre {type.toLowerCase()} de {guests} invités, budget estimé {budget}.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6 border border-noir/10 bg-white/40 p-6 sm:p-8">
      <h3 className="font-display text-2xl text-noir">Créez votre événement</h3>

      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-noir/50">Type d&apos;événement</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {eventTypes.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={cn(pill(type === t), "uppercase tracking-[0.1em]")}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-noir/50">Nombre d&apos;invités</label>
          <input
            type="number"
            min={1}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="mt-2 w-full border border-noir/20 bg-white/60 p-3 text-sm outline-none focus:border-or"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-noir/50">Date souhaitée</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-2 w-full border border-noir/20 bg-white/60 p-3 text-sm outline-none focus:border-or"
          />
        </div>
      </div>

      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-noir/50">Budget estimé</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {BUDGETS.map((b) => (
            <button
              key={b}
              onClick={() => setBudget(b)}
              className={pill(budget === b)}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs uppercase tracking-[0.2em] text-noir/50">Ambiance souhaitée</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {AMBIANCES.map((a) => (
            <button
              key={a}
              onClick={() => setAmbiance(a)}
              className={pill(ambiance === a)}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <input placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} className="border border-noir/20 bg-white/60 p-3 text-sm outline-none focus:border-or" />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-noir/20 bg-white/60 p-3 text-sm outline-none focus:border-or" />
        <input type="tel" placeholder="Téléphone" value={phone} onChange={(e) => setPhone(e.target.value)} className="border border-noir/20 bg-white/60 p-3 text-sm outline-none focus:border-or" />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button onClick={submit} disabled={loading || !name || !email || !phone || !date} className="w-full">
        {loading ? "Envoi…" : "Recevoir une proposition"}
      </Button>
      <p className="text-xs text-noir/40">
        Budget indicatif — un devis précis vous sera communiqué. Exemple de référence :{" "}
        {formatFCFA(14000)} / personne en moyenne.
      </p>
    </div>
  );
}
