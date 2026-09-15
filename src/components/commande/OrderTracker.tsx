"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Clock, ChefHat, PackageCheck, Bike } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const STEPS = [
  { key: "RECUE", label: "Commande reçue", icon: Check },
  { key: "PREPARATION", label: "En préparation", icon: ChefHat },
  { key: "PRETE", label: "Prête", icon: PackageCheck },
  { key: "LIVRAISON", label: "En livraison", icon: Bike },
];

export function OrderTracker({ orderId }: { orderId: string }) {
  const [status, setStatus] = useState("RECUE");

  useEffect(() => {
    let active = true;
    const poll = async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        if (!res.ok) return;
        const data = await res.json();
        if (active) setStatus(data.order.status);
      } catch {
        // ignore transient errors while polling
      }
    };
    poll();
    const interval = setInterval(poll, 8000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [orderId]);

  const activeIndex = Math.max(
    0,
    STEPS.findIndex((s) => s.key === status)
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-lg text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-or/20">
        <Check className="h-8 w-8 text-or" />
      </div>
      <h2 className="mt-6 font-display text-2xl text-noir">Commande confirmée</h2>
      <p className="mt-2 text-sm text-noir/50">Référence : {orderId.slice(0, 8).toUpperCase()}</p>

      <div className="mt-10 flex items-center justify-between">
        {STEPS.map((s, i) => (
          <div key={s.key} className="flex flex-1 flex-col items-center gap-2">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                i <= activeIndex ? "border-or bg-or text-noir" : "border-noir/20 text-noir/30"
              )}
            >
              <s.icon className="h-4 w-4" />
            </div>
            <span className={cn("text-[10px] uppercase tracking-[0.1em]", i <= activeIndex ? "text-noir" : "text-noir/30")}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-noir/50">
        <Clock className="h-4 w-4" />
        Mise à jour automatique du statut
      </div>

      <Button href="/" className="mt-10">
        Retour à l&apos;accueil
      </Button>
    </motion.div>
  );
}
