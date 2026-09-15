"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn, formatFCFA } from "@/lib/utils";

const AMOUNTS = [25000, 50000, 100000];

export function GiftCardForm() {
  const [amount, setAmount] = useState(AMOUNTS[0]);
  const [fromName, setFromName] = useState("");
  const [toName, setToName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState<string | null>(null);
  const [error, setError] = useState("");

  const submit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/gift-cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, fromName, toName, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error();
      setCode(data.giftCard.code);
    } catch {
      setError("Une erreur est survenue, merci de réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="flex aspect-[16/10] flex-col justify-between bg-gradient-to-br from-noir via-espresso to-noir p-8 text-ivoire shadow-xl"
      >
        <div className="flex items-center justify-between">
          <span className="font-display text-lg tracking-[0.1em]">GASPARD Signature</span>
          <Gift className="h-6 w-6 text-or" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-or-soft">Carte cadeau</p>
          <p className="mt-2 font-display text-4xl text-or">{formatFCFA(amount)}</p>
        </div>
        <div className="flex items-center justify-between text-xs text-ivoire/60">
          <span>Pour : {toName || "..."}</span>
          <span>De : {fromName || "..."}</span>
        </div>
      </motion.div>

      <div className="space-y-6">
        {code ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border border-or/40 bg-white/50 p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-or/20">
              <Check className="h-7 w-7 text-or" />
            </div>
            <h3 className="mt-6 font-display text-xl text-noir">Carte cadeau créée</h3>
            <p className="mt-3 text-sm text-noir/60">
              Code : <strong className="text-noir">{code}</strong>
            </p>
            <p className="mt-1 text-sm text-noir/50">
              Ce code sera envoyé par email et pourra être utilisé lors de votre prochaine visite.
            </p>
          </motion.div>
        ) : (
          <>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-noir/50">Montant</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {AMOUNTS.map((a) => (
                  <button
                    key={a}
                    onClick={() => setAmount(a)}
                    className={cn(
                      "border px-5 py-2.5 text-sm",
                      amount === a ? "border-or bg-or text-noir" : "border-noir/15 text-noir/60"
                    )}
                  >
                    {formatFCFA(a)}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input placeholder="Votre nom" value={fromName} onChange={(e) => setFromName(e.target.value)} className="border border-noir/20 bg-white/60 p-3 text-sm outline-none focus:border-or" />
              <input placeholder="Nom du destinataire" value={toName} onChange={(e) => setToName(e.target.value)} className="border border-noir/20 bg-white/60 p-3 text-sm outline-none focus:border-or" />
            </div>
            <textarea
              placeholder="Message personnel (optionnel)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full resize-none border border-noir/20 bg-white/60 p-3 text-sm outline-none focus:border-or"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button onClick={submit} disabled={loading || !fromName || !toName} className="w-full">
              {loading ? "Création…" : "Offrir cette carte"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
