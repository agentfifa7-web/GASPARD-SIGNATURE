"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/compte";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) {
      setError("Email ou mot de passe incorrect.");
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-sm space-y-5">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-noir/20 bg-white/60 p-3 text-sm outline-none focus:border-or"
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border border-noir/20 bg-white/60 p-3 text-sm outline-none focus:border-or"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button onClick={submit} disabled={loading || !email || !password} className="w-full">
        {loading ? "Connexion…" : "Se connecter"}
      </Button>
      <p className="text-center text-sm text-noir/60">
        Pas encore de compte ?{" "}
        <Link href="/inscription" className="text-or underline">
          Créer un compte
        </Link>
      </p>
      <p className="text-center text-xs text-noir/40">
        Démo : client@gaspard-signature.ci / Client2024!
      </p>
    </div>
  );
}
