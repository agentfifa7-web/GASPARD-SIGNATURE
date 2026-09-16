"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { Minus, Plus, Trash2, Store, ShoppingBag, Bike } from "lucide-react";
import { Scene, type SceneKey } from "@/components/ui/Scene";
import { Button } from "@/components/ui/Button";
import { cn, formatFCFA } from "@/lib/utils";
import { useCartStore, type CartItem } from "@/lib/cart-store";
import { useMounted } from "@/lib/use-mounted";
import { OrderTracker } from "./OrderTracker";

const MODES = [
  { id: "SUR_PLACE", label: "Sur place", icon: Store },
  { id: "A_EMPORTER", label: "À emporter", icon: ShoppingBag },
  { id: "LIVRAISON", label: "Livraison", icon: Bike },
] as const;

const PAYMENTS = ["Espèces", "Mobile Money (Orange/MTN/Wave/Moov)", "Carte bancaire", "Paiement sur place"];

export function CommandeFlow() {
  const mounted = useMounted();
  const { data: session } = useSession();
  const { items, mode, setMode, updateQuantity, removeItem, total, clear } = useCartStore();
  const [step, setStep] = useState(1);
  const [name, setName] = useState(session?.user?.name ?? "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(PAYMENTS[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState<string | null>(null);

  const submit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          name,
          phone,
          address: mode === "LIVRAISON" ? address : undefined,
          paymentMethod,
          items: items.map((i) => ({ id: i.id, quantity: i.quantity, notes: i.notes })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur");
      setOrderId(data.order.id);
      clear();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return <OrderTracker orderId={orderId} />;
  }

  if (!mounted) {
    return <div className="py-16 text-center text-noir/40">Chargement de votre panier…</div>;
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <p className="text-noir/60">Votre panier est vide.</p>
        <Button href="/la-carte" className="mt-6">
          Voir la carte
        </Button>
      </div>
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
          <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
            <div>
              <h3 className="font-display text-xl text-noir">Comment souhaitez-vous commander ?</h3>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {MODES.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMode(m.id)}
                    className={cn(
                      "flex flex-col items-center gap-2 border p-5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-or",
                      mode === m.id
                        ? "border-or bg-or/10 shadow-[0_10px_24px_-12px_rgba(201,169,110,0.5)]"
                        : "border-noir/15 hover:-translate-y-0.5 hover:border-or/50 hover:shadow-[0_10px_20px_-14px_rgba(11,11,11,0.3)]"
                    )}
                  >
                    <m.icon className="h-6 w-6 text-or" strokeWidth={1.5} />
                    <span className="text-xs uppercase tracking-[0.15em] text-noir/80">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display text-xl text-noir">Votre panier</h3>
              <div className="mt-4 space-y-3">
                {items.map((item: CartItem) => (
                  <div key={item.id} className="flex items-center gap-4 border border-noir/10 bg-white/40 p-3">
                    <Scene scene={item.image as SceneKey} className="h-16 w-16 shrink-0" iconClassName="h-6 w-6" />
                    <div className="flex-1">
                      <p className="font-display text-sm text-noir">{item.name}</p>
                      {item.notes && <p className="text-xs italic text-noir/50">{item.notes}</p>}
                      <p className="text-sm text-or">{formatFCFA(item.price)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex h-7 w-7 items-center justify-center border border-noir/20"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-5 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex h-7 w-7 items-center justify-center border border-noir/20"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-noir/40 hover:text-red-600" aria-label="Retirer">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-noir/10 pt-4">
                <span className="text-sm uppercase tracking-[0.15em] text-noir/60">Total</span>
                <span className="font-display text-2xl text-or">{formatFCFA(total())}</span>
              </div>
            </div>

            <Button onClick={() => setStep(2)} className="w-full">
              Continuer
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
            <h3 className="font-display text-xl text-noir">Vos informations</h3>
            <input
              placeholder="Nom complet"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-noir/20 bg-white/60 p-3 text-sm outline-none focus:border-or"
            />
            <input
              type="tel"
              placeholder="Téléphone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-noir/20 bg-white/60 p-3 text-sm outline-none focus:border-or"
            />
            {mode === "LIVRAISON" && (
              <textarea
                placeholder="Adresse de livraison complète"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                className="w-full resize-none border border-noir/20 bg-white/60 p-3 text-sm outline-none focus:border-or"
              />
            )}
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(1)} className="w-full">
                Retour
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!name || !phone || (mode === "LIVRAISON" && !address)}
                className="w-full"
              >
                Continuer
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
            <h3 className="font-display text-xl text-noir">Moyen de paiement</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {PAYMENTS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPaymentMethod(p)}
                  className={cn(
                    "border p-4 text-left text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-or",
                    paymentMethod === p
                      ? "border-or bg-or/10 text-noir shadow-[0_10px_24px_-12px_rgba(201,169,110,0.5)]"
                      : "border-noir/15 text-noir/60 hover:-translate-y-0.5 hover:border-or/50 hover:shadow-[0_10px_20px_-14px_rgba(11,11,11,0.3)]"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
            <p className="text-xs text-noir/40">
              Architecture prête pour l&apos;intégration des solutions de paiement mobile locales
              (Orange Money, MTN MoMo, Wave, Moov Money).
            </p>

            <div className="border border-noir/10 bg-noir/5 p-4 text-sm text-noir/70">
              {items.length} article(s) · Total <strong>{formatFCFA(total())}</strong>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(2)} className="w-full">
                Retour
              </Button>
              <Button onClick={submit} disabled={loading} className="w-full">
                {loading ? "Envoi…" : "Confirmer la commande"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
