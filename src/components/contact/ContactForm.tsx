"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
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
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border border-or/40 bg-white/50 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-or/20">
          <Check className="h-6 w-6 text-or" />
        </div>
        <h3 className="mt-4 font-display text-lg text-noir">Message envoyé</h3>
        <p className="mt-2 text-sm text-noir/60">Nous vous répondrons dans les plus brefs délais.</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} className="border border-noir/20 bg-white/60 p-3 text-sm outline-none focus:border-or" />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-noir/20 bg-white/60 p-3 text-sm outline-none focus:border-or" />
      </div>
      <input placeholder="Sujet" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full border border-noir/20 bg-white/60 p-3 text-sm outline-none focus:border-or" />
      <textarea
        placeholder="Votre message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={5}
        className="w-full resize-none border border-noir/20 bg-white/60 p-3 text-sm outline-none focus:border-or"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button onClick={submit} disabled={loading || !name || !email || !subject || !message} className="w-full sm:w-auto">
        {loading ? "Envoi…" : "Envoyer le message"}
      </Button>
    </div>
  );
}
