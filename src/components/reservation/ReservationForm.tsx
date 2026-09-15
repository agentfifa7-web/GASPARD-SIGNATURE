"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { Minus, Plus, Check, CalendarDays, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn, formatDateFr } from "@/lib/utils";

const OCCASIONS = ["Dîner", "Anniversaire", "Rendez-vous", "Déjeuner professionnel", "Afterwork", "Autre"];
const SPACES = [
  { id: "Salle intérieure", desc: "Ambiance feutrée, climatisée, idéale toute la journée." },
  { id: "Terrasse", desc: "En plein air, parfaite pour les soirées douces d'Abidjan." },
  { id: "Table romantique", desc: "Un cadre intime pour deux, aux chandelles." },
  { id: "Espace privé", desc: "Un salon fermé pour vos moments confidentiels." },
];

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

export function ReservationForm({ defaultOccasion }: { defaultOccasion?: string }) {
  const { data: session } = useSession();
  const [step, setStep] = useState(1);
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState(todayISO());
  const [time, setTime] = useState("19:30");
  const [occasion, setOccasion] = useState(defaultOccasion && OCCASIONS.includes(defaultOccasion) ? defaultOccasion : "Dîner");
  const [space, setSpace] = useState("Salle intérieure");
  const [name, setName] = useState(session?.user?.name ?? "");
  const [email, setEmail] = useState(session?.user?.email ?? "");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, guests, date, time, occasion, space, notes }),
      });
      if (!res.ok) throw new Error("Erreur lors de la réservation");
      setDone(true);
    } catch {
      setError("Une erreur est survenue. Merci de réessayer ou de nous contacter directement.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-lg border border-or/40 bg-white/50 p-10 text-center"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-or/20">
          <Check className="h-8 w-8 text-or" />
        </div>
        <h2 className="mt-6 font-display text-2xl text-noir">Réservation confirmée</h2>
        <p className="mt-3 text-noir/60">
          Table pour {guests} le {formatDateFr(date)} à {time}, {space.toLowerCase()}.
        </p>
        <p className="mt-1 text-sm text-noir/50">
          Un message de confirmation vous sera envoyé à {email}.
        </p>
        <Button href="/" className="mt-8">
          Retour à l&apos;accueil
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-10 flex items-center justify-center gap-3">
        {[1, 2, 3].map((s) => (
          <div key={s} className={cn("h-1 w-16 transition-colors", step >= s ? "bg-or" : "bg-noir/15")} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
            <div>
              <label className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-noir/50">
                <Users className="h-4 w-4" /> Nombre de personnes
              </label>
              <div className="mt-3 flex items-center gap-6">
                <button
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  className="flex h-11 w-11 items-center justify-center border border-noir/20 hover:border-or"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-display text-3xl text-noir">{guests}</span>
                <button
                  onClick={() => setGuests((g) => Math.min(20, g + 1))}
                  className="flex h-11 w-11 items-center justify-center border border-noir/20 hover:border-or"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-noir/50">
                  <CalendarDays className="h-4 w-4" /> Date
                </label>
                <input
                  type="date"
                  min={todayISO()}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-3 w-full border border-noir/20 bg-white/60 p-3 text-sm outline-none focus:border-or"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-noir/50">
                  <Clock className="h-4 w-4" /> Heure
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="mt-3 w-full border border-noir/20 bg-white/60 p-3 text-sm outline-none focus:border-or"
                />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-noir/50">Occasion</label>
              <div className="mt-3 flex flex-wrap gap-2">
                {OCCASIONS.map((o) => (
                  <button
                    key={o}
                    onClick={() => setOccasion(o)}
                    className={cn(
                      "border px-4 py-2 text-xs uppercase tracking-[0.15em] transition-colors",
                      occasion === o ? "border-or bg-or text-noir" : "border-noir/15 text-noir/60 hover:border-or"
                    )}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            <Button onClick={() => setStep(2)} className="w-full">
              Continuer
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <h3 className="font-display text-xl text-noir">Choisissez votre espace</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {SPACES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSpace(s.id)}
                  className={cn(
                    "border p-5 text-left transition-colors",
                    space === s.id ? "border-or bg-or/10" : "border-noir/15 hover:border-or/50"
                  )}
                >
                  <span className="font-display text-lg text-noir">{s.id}</span>
                  <p className="mt-1 text-sm text-noir/60">{s.desc}</p>
                </button>
              ))}
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(1)} className="w-full">
                Retour
              </Button>
              <Button onClick={() => setStep(3)} className="w-full">
                Continuer
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
            <h3 className="font-display text-xl text-noir">Vos coordonnées</h3>
            <input
              placeholder="Nom complet"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-noir/20 bg-white/60 p-3 text-sm outline-none focus:border-or"
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-noir/20 bg-white/60 p-3 text-sm outline-none focus:border-or"
              />
              <input
                type="tel"
                placeholder="Téléphone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-noir/20 bg-white/60 p-3 text-sm outline-none focus:border-or"
              />
            </div>
            <textarea
              placeholder="Demande particulière (optionnel)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full resize-none border border-noir/20 bg-white/60 p-3 text-sm outline-none focus:border-or"
            />

            <div className="border border-noir/10 bg-noir/5 p-4 text-sm text-noir/70">
              Table pour <strong>{guests}</strong> · {formatDateFr(date)} à <strong>{time}</strong> ·{" "}
              {occasion} · {space}
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(2)} className="w-full">
                Retour
              </Button>
              <Button onClick={submit} disabled={loading || !name || !email || !phone} className="w-full">
                {loading ? "Confirmation…" : "Confirmer la réservation"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
