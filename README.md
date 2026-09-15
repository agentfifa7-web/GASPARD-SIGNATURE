# GASPARD Signature

Plateforme digitale premium pour le restaurant **GASPARD Signature** (Angré 8e Tranche, Cocody, Abidjan) : site vitrine éditorial, carte digitale, réservation, commande en ligne, programme de fidélité, événements privés et back-office professionnel.

## Stack technique

- **Frontend** : Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion
- **Backend** : API Routes Next.js, Prisma ORM
- **Base de données** : SQLite (fichier local `prisma/dev.db`) — remplaçable par PostgreSQL en production en changeant simplement `DATABASE_URL` et le `provider` du schéma Prisma
- **Authentification** : Auth.js (NextAuth v5) avec Credentials + JWT
- **Graphiques admin** : Recharts

## Démarrage

```bash
npm install
npm run db:push     # crée la base SQLite à partir du schéma Prisma
npm run db:seed      # données de démonstration (menu, galerie, stories, comptes...)
npm run dev
```

Le site est disponible sur [http://localhost:3000](http://localhost:3000).

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
