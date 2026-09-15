# GASPARD Signature

Plateforme digitale premium pour le restaurant **GASPARD Signature** (Angré 8e Tranche, Cocody, Abidjan) : site vitrine éditorial, carte digitale, réservation, commande en ligne, programme de fidélité, événements privés et back-office professionnel.

## Stack technique

- **Frontend** : Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion
- **Backend** : API Routes Next.js, Prisma ORM
- **Base de données** : PostgreSQL (compatible Vercel Postgres / Neon / Supabase / toute base Postgres classique)
- **Authentification** : Auth.js (NextAuth v5) avec Credentials + JWT — config séparée en `auth.config.ts` (edge-safe, utilisée par le middleware) et `auth.ts` (Prisma + bcrypt, utilisée côté serveur uniquement), pour rester compatible avec le Edge Runtime de Vercel
- **Graphiques admin** : Recharts

## Démarrage en local

```bash
npm install
# Renseigner DATABASE_URL dans .env (une base Postgres locale ou distante)
npm run db:push      # crée les tables à partir du schéma Prisma
npm run db:seed      # données de démonstration (menu, galerie, stories, comptes...)
npm run dev
```

Le site est disponible sur [http://localhost:3000](http://localhost:3000).

Si vous n'avez pas de PostgreSQL en local, le plus simple est de créer une base gratuite chez [Neon](https://neon.tech) ou [Supabase](https://supabase.com) et de coller son `DATABASE_URL` dans `.env`.

## Déployer sur Vercel

Le projet est déjà poussé sur GitHub, ce qui permet un déploiement en quelques clics, sans ligne de commande :

1. **Créer une base de données Postgres** (à faire une seule fois) :
   - Sur [vercel.com](https://vercel.com), aller dans l'onglet **Storage** → **Create Database** → **Postgres** (propulsé par Neon). Vercel génère automatiquement la variable `DATABASE_URL`.
   - Alternative : créer une base gratuite sur [neon.tech](https://neon.tech) ou [supabase.com](https://supabase.com) et récupérer l'URL de connexion.
2. **Importer le projet** :
   - Sur le tableau de bord Vercel, cliquer **Add New → Project**, puis choisir le dépôt GitHub `agentfifa7-web/gaspard-signature` (branche `claude/dazzling-hamilton-e3n4zs` ou `main` après fusion).
3. **Renseigner les variables d'environnement** (onglet *Environment Variables* du projet) :
   - `DATABASE_URL` → l'URL Postgres de l'étape 1 (si créée via Vercel Storage, elle est déjà pré-remplie automatiquement).
   - `AUTH_SECRET` → une chaîne aléatoire longue (générable avec `openssl rand -base64 32`).
4. **Déployer** : cliquer sur **Deploy**. Vercel installe les dépendances (le script `postinstall` lance `prisma generate` automatiquement), construit le site et le met en ligne.
5. **Initialiser la base de données de production** (une seule fois, après le premier déploiement) :
   - En local, créer un fichier temporaire `.env.production.local` avec le `DATABASE_URL` de production (visible dans Vercel → Storage, ou copié depuis Neon/Supabase).
   - Exécuter :
     ```bash
     npx dotenv -e .env.production.local -- npx prisma db push
     npx dotenv -e .env.production.local -- npx tsx prisma/seed.ts
     ```
   - Ou plus simplement, avec la [CLI Vercel](https://vercel.com/docs/cli) : `vercel env pull .env.production.local` puis les deux commandes ci-dessus.

Une fois ces étapes faites, le site est en ligne à l'URL fournie par Vercel (`https://<nom-du-projet>.vercel.app`), avec réservations, commandes, comptes clients et back-office pleinement fonctionnels.

## Comptes de démonstration

| Rôle   | Email                             | Mot de passe   |
|--------|------------------------------------|----------------|
| Admin  | admin@gaspard-signature.ci         | Gaspard2024!   |
| Client | client@gaspard-signature.ci        | Client2024!    |

Le back-office est accessible sur `/admin` (réservé au rôle `ADMIN`).

## Fonctionnalités principales

- **Accueil** : hero cinématographique, sélecteur "GASPARD Moments", Chef's Choice dynamique, stories, galerie, avis clients
- **La Carte** : carte digitale par catégories, fiche plat (ingrédients, allergènes, personnalisation), ajout au panier
- **Réservation** : parcours en 3 étapes avec choix d'espace et confirmation instantanée
- **Commander** : sur place / à emporter / livraison, panier, suivi de commande en temps réel
- **GASPARD Club** : programme de fidélité par paliers de points
- **Événements** : catégories d'événements + formulaire "Créez votre événement"
- **GASPARD Stories** : magazine éditorial (Food, People, Lifestyle, Events, Abidjan)
- **Galerie** : masonry filtrable avec lightbox
- **Cartes cadeaux** : génération de cartes cadeaux avec code unique
- **Mon GASPARD** : espace client (réservations, commandes, favoris, points de fidélité)
- **Back-office `/admin`** : dashboard KPIs, gestion des commandes et réservations, CRUD menu (plats/prix/photos/disponibilité), promotions, événements, CRM clients, analytics (plats les plus vendus, heures de pointe, panier moyen, CA, nouveaux vs clients fidèles)

## Visuels

Les visuels des plats, de la galerie et des espaces sont générés dynamiquement (dégradés + iconographie de la charte) via le composant `Scene`, en attendant l'intégration de la photographie professionnelle du restaurant. Il suffit de remplacer le champ `image` (nom de la scène) par une URL réelle et d'adapter le composant pour basculer vers de vraies photos.

## Paiement, WhatsApp, SMS

L'architecture (modèle `Order`, champ `paymentMethod`, formulaires de commande) est prête pour l'intégration des solutions locales (Orange Money, MTN MoMo, Wave, Moov Money) ainsi que des notifications WhatsApp/SMS/email, à brancher selon les comptes marchands du restaurant.
