"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur");

      const signInRes = await signIn("credentials", { email, password, redirect: false });
      if (signInRes?.error) throw new Error("Compte créé, merci de vous connecter.");

      router.push("/compte");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-sm space-y-5">
      <input placeholder="Nom complet" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-noir/20 bg-white/60 p-3 text-sm outline-none focus:border-or" />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-noir/20 bg-white/60 p-3 text-sm outline-none focus:border-or" />
      <input type="tel" placeholder="Téléphone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border border-noir/20 bg-white/60 p-3 text-sm outline-none focus:border-or" />
      <input type="password" placeholder="Mot de passe (8 caractères min.)" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-noir/20 bg-white/60 p-3 text-sm outline-none focus:border-or" />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button onClick={submit} disabled={loading || !name || !email || !password} className="w-full">
        {loading ? "Création…" : "Créer mon compte"}
      </Button>
      <p className="text-center text-sm text-noir/60">
        Déjà client ?{" "}
        <Link href="/connexion" className="text-or underline">
          Se connecter
        </Link>
      </p>
    </div>
  );
}
