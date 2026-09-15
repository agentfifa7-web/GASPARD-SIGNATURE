import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe Auth.js config: no Prisma, no bcrypt, no Node-only APIs.
 * Vercel's middleware runs on the Edge runtime, which cannot bundle
 * Prisma's Node engine — so this file (and only this file) is imported
 * by proxy.ts. The full config with the Credentials provider lives in
 * auth.ts and is only used by the API route / server components (Node runtime).
 */
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/connexion",
  },
  providers: [],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role ?? "CLIENT";
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};
