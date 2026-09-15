import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const CATEGORIES = [
  { slug: "petit-dejeuner", name: "Petit-déjeuner", order: 1 },
  { slug: "entrees", name: "Entrées", order: 2 },
  { slug: "salades", name: "Salades", order: 3 },
  { slug: "pizzas", name: "Pizzas", order: 4 },
  { slug: "burgers", name: "Burgers", order: 5 },
  { slug: "pates", name: "Pâtes", order: 6 },
  { slug: "grillades", name: "Grillades", order: 7 },
  { slug: "poissons", name: "Poissons", order: 8 },
  { slug: "signature", name: "Plats signature", order: 9 },
  { slug: "desserts", name: "Desserts", order: 10 },
  { slug: "patisseries", name: "Pâtisseries", order: 11 },
  { slug: "boissons", name: "Boissons", order: 12 },
  { slug: "cocktails", name: "Cocktails", order: 13 },
] as const;

type Scene =
  | "pizza" | "burger" | "pasta" | "grill" | "fish" | "salad" | "dessert"
  | "pastry" | "breakfast" | "cocktail" | "wine" | "soup";

const MENU: Record<string, Array<{
  name: string; description: string; price: number; image: Scene;
  ingredients: string; allergens: string; chefPick?: boolean;
}>> = {
  "petit-dejeuner": [
    { name: "GASPARD Morning", description: "Œufs brouillés crémeux, avocat, pain brioché toasté, jus pressé du jour.", price: 6500, image: "breakfast", ingredients: "Œufs, avocat, pain brioché, beurre", allergens: "Gluten, œufs, lait" },
    { name: "Pancakes Signature", description: "Pancakes moelleux, sirop d'érable, fruits de saison, chantilly maison.", price: 5500, image: "breakfast", ingredients: "Farine, lait, œufs, sirop d'érable", allergens: "Gluten, lait, œufs", chefPick: true },
    { name: "Bowl Açaï Cocody", description: "Purée d'açaï, granola croustillant, banane, fruits rouges, miel.", price: 6000, image: "breakfast", ingredients: "Açaï, granola, fruits rouges, miel", allergens: "Fruits à coque" },
  ],
  entrees: [
    { name: "Tartare de Thon Rouge", description: "Thon rouge frais, avocat, sésame torréfié, sauce yuzu.", price: 7500, image: "fish", ingredients: "Thon rouge, avocat, sésame, yuzu", allergens: "Poisson, soja" },
    { name: "Croquettes de Crevettes", description: "Crevettes panées croustillantes, sauce aigre-douce maison.", price: 6500, image: "grill", ingredients: "Crevettes, panko, épices", allergens: "Crustacés, gluten" },
    { name: "Bruschettas GASPARD", description: "Pain grillé, tomates confites, burrata, basilic frais, huile d'olive.", price: 5500, image: "salad", ingredients: "Pain, tomates, burrata, basilic", allergens: "Gluten, lait" },
  ],
  salades: [
    { name: "Salade César Signature", description: "Poulet grillé, romaine croquante, parmesan, croûtons maison, sauce César.", price: 6500, image: "salad", ingredients: "Poulet, romaine, parmesan, croûtons", allergens: "Gluten, lait, œufs" },
    { name: "Salade Méditerranée", description: "Feta, olives Kalamata, concombre, tomates cerises, oignon rouge.", price: 6000, image: "salad", ingredients: "Feta, olives, concombre, tomates", allergens: "Lait" },
    { name: "Salade Saumon Avocat", description: "Saumon fumé, avocat, roquette, vinaigrette agrumes.", price: 8000, image: "salad", ingredients: "Saumon fumé, avocat, roquette", allergens: "Poisson", chefPick: true },
  ],
  pizzas: [
    { name: "Pizza Regina Truffe", description: "Jambon fumé, champignons, mozzarella di bufala, huile de truffe.", price: 8500, image: "pizza", ingredients: "Pâte, mozzarella, jambon, champignons, truffe", allergens: "Gluten, lait", chefPick: true },
    { name: "Pizza 4 Fromages", description: "Mozzarella, gorgonzola, parmesan, chèvre, miel de fleurs.", price: 8000, image: "pizza", ingredients: "Pâte, 4 fromages, miel", allergens: "Gluten, lait" },
    { name: "Pizza Napoli", description: "Sauce tomate San Marzano, mozzarella, anchois, câpres, origan.", price: 7500, image: "pizza", ingredients: "Pâte, tomate, mozzarella, anchois", allergens: "Gluten, lait, poisson" },
    { name: "Pizza Diavola", description: "Sauce piquante, salami épicé, piments frais, mozzarella.", price: 8000, image: "pizza", ingredients: "Pâte, salami, piment, mozzarella", allergens: "Gluten, lait" },
  ],
  burgers: [
    { name: "GASPARD Signature Burger", description: "Bœuf Angus 200g, cheddar affiné, oignons caramélisés, sauce signature.", price: 8500, image: "burger", ingredients: "Bœuf Angus, cheddar, pain brioché", allergens: "Gluten, lait, œufs", chefPick: true },
    { name: "Chicken Crispy Burger", description: "Poulet croustillant, sauce épicée, coleslaw maison, pickles.", price: 7500, image: "burger", ingredients: "Poulet, coleslaw, pain brioché", allergens: "Gluten, œufs" },
    { name: "Veggie Burger", description: "Galette de légumes grillés, avocat, roquette, sauce tahini.", price: 6500, image: "burger", ingredients: "Légumes, avocat, tahini, pain", allergens: "Gluten, sésame" },
  ],
  pates: [
    { name: "Tagliatelles Truffe & Parmesan", description: "Tagliatelles fraîches, crème de truffe, copeaux de parmesan.", price: 9000, image: "pasta", ingredients: "Pâtes, crème, truffe, parmesan", allergens: "Gluten, lait, œufs", chefPick: true },
    { name: "Linguine aux Fruits de Mer", description: "Linguine, crevettes, calamars, moules, sauce tomate safranée.", price: 9500, image: "pasta", ingredients: "Pâtes, fruits de mer, tomate", allergens: "Gluten, crustacés, mollusques" },
    { name: "Penne Arrabiata", description: "Penne, sauce tomate pimentée, ail confit, basilic.", price: 6500, image: "pasta", ingredients: "Pâtes, tomate, ail, piment", allergens: "Gluten" },
  ],
  grillades: [
    { name: "Côte de Bœuf Black Angus", description: "400g grillée au feu de bois, beurre maître d'hôtel, frites maison.", price: 15000, image: "grill", ingredients: "Bœuf Angus, beurre, pommes de terre", allergens: "Lait", chefPick: true },
    { name: "Brochettes d'Agneau", description: "Agneau mariné aux épices, légumes grillés, sauce yaourt-menthe.", price: 9500, image: "grill", ingredients: "Agneau, épices, légumes, yaourt", allergens: "Lait" },
    { name: "Poulet Braisé GASPARD", description: "Poulet fermier mariné, sauce braisée maison, attiéké.", price: 7500, image: "grill", ingredients: "Poulet, épices, attiéké", allergens: "" },
  ],
  poissons: [
    { name: "Bar Grillé Sauce Citronnée", description: "Filet de bar entier grillé, beurre citronné, légumes de saison.", price: 11000, image: "fish", ingredients: "Bar, citron, beurre, légumes", allergens: "Poisson, lait" },
    { name: "Saumon Teriyaki", description: "Pavé de saumon laqué teriyaki, riz vapeur, brocolis.", price: 10500, image: "fish", ingredients: "Saumon, sauce teriyaki, riz", allergens: "Poisson, soja, gluten", chefPick: true },
    { name: "Capitaine Braisé", description: "Capitaine braisé aux épices locales, banane plantain, sauce piquante.", price: 9500, image: "fish", ingredients: "Capitaine, plantain, épices", allergens: "Poisson" },
  ],
  signature: [
    { name: "Le Gaspard Royal", description: "Filet de bœuf, foie gras poêlé, sauce au porto, écrasé de pommes de terre truffé.", price: 18000, image: "grill", ingredients: "Bœuf, foie gras, porto, truffe", allergens: "Lait", chefPick: true },
    { name: "Duo Terre & Mer", description: "Filet de bœuf et gambas grillées, sauce beurre blanc, légumes de saison.", price: 17500, image: "grill", ingredients: "Bœuf, gambas, beurre blanc", allergens: "Crustacés, lait" },
    { name: "Risotto aux Cèpes et Truffe", description: "Risotto crémeux, cèpes poêlés, copeaux de truffe fraîche.", price: 9500, image: "pasta", ingredients: "Riz arborio, cèpes, truffe, parmesan", allergens: "Lait" },
  ],
  desserts: [
    { name: "Fondant au Chocolat", description: "Cœur coulant, glace vanille de Madagascar, coulis de fruits rouges.", price: 4500, image: "dessert", ingredients: "Chocolat, œufs, beurre, vanille", allergens: "Gluten, lait, œufs", chefPick: true },
    { name: "Tiramisu GASPARD", description: "Recette maison au café corsé et mascarpone onctueux.", price: 4000, image: "dessert", ingredients: "Mascarpone, café, biscuits, cacao", allergens: "Gluten, lait, œufs" },
    { name: "Cheesecake Fruits Rouges", description: "Base sablée, crème de fromage frais, coulis de fruits rouges.", price: 4500, image: "dessert", ingredients: "Fromage frais, biscuits, fruits rouges", allergens: "Gluten, lait, œufs" },
  ],
  patisseries: [
    { name: "Croissant Pur Beurre", description: "Croissant feuilleté, pur beurre, cuisson du jour.", price: 2000, image: "pastry", ingredients: "Farine, beurre, levure", allergens: "Gluten, lait" },
    { name: "Éclair Café GASPARD", description: "Pâte à choux, crème pâtissière au café, glaçage fondant.", price: 2500, image: "pastry", ingredients: "Pâte à choux, café, crème", allergens: "Gluten, lait, œufs" },
    { name: "Macarons Signature", description: "Assortiment de macarons parfums de saison (x4).", price: 3500, image: "pastry", ingredients: "Amande, sucre, œufs, ganache", allergens: "Fruits à coque, œufs, lait" },
  ],
  boissons: [
    { name: "Jus Pressé du Jour", description: "Fruits frais de saison, pressés minute.", price: 2500, image: "breakfast", ingredients: "Fruits frais", allergens: "" },
    { name: "Café GASPARD", description: "Espresso, cappuccino ou latte, torréfaction artisanale.", price: 2000, image: "breakfast", ingredients: "Café, lait", allergens: "Lait" },
    { name: "Thé Glacé Maison", description: "Thé glacé infusé aux fruits et menthe fraîche.", price: 2500, image: "breakfast", ingredients: "Thé, fruits, menthe", allergens: "" },
  ],
  cocktails: [
    { name: "GASPARD Signature Cocktail", description: "Rhum vieux, passion, gingembre, citron vert — la signature de la maison.", price: 5500, image: "cocktail", ingredients: "Rhum, passion, gingembre, citron", allergens: "", chefPick: true },
    { name: "Espresso Martini", description: "Vodka, café espresso, liqueur de café.", price: 5500, image: "cocktail", ingredients: "Vodka, espresso, liqueur café", allergens: "" },
    { name: "Mojito Passion", description: "Rhum blanc, fruit de la passion, menthe fraîche, citron vert.", price: 5000, image: "cocktail", ingredients: "Rhum, passion, menthe, citron", allergens: "" },
    { name: "Sunset Cocody", description: "Tequila, mangue, piment doux, citron vert.", price: 5500, image: "wine", ingredients: "Tequila, mangue, piment, citron", allergens: "" },
  ],
};

const EVENT_CATEGORIES = [
  { slug: "anniversaires", name: "Anniversaires", description: "Célébrez votre journée spéciale dans un cadre élégant avec un gâteau signature et une attention personnalisée.", order: 1 },
  { slug: "brunch", name: "Brunch", description: "Brunchs conviviaux le week-end, entre amis ou en famille, dans une ambiance chaleureuse.", order: 2 },
  { slug: "soirees", name: "Soirées", description: "Nos soirées thématiques avec DJ, cocktails signature et ambiance lounge jusque tard dans la nuit.", order: 3 },
  { slug: "afterworks", name: "Afterworks", description: "Retrouvez vos collègues autour de cocktails et de tapas gourmandes après le travail.", order: 4 },
  { slug: "saint-valentin", name: "Saint-Valentin", description: "Un menu romantique et une ambiance intimiste pour un dîner à deux inoubliable.", order: 5 },
  { slug: "fetes", name: "Fêtes de fin d'année", description: "Réveillons et fêtes de fin d'année dans une ambiance festive et raffinée.", order: 6 },
  { slug: "entreprise", name: "Événements d'entreprise", description: "Séminaires, déjeuners d'affaires et cocktails professionnels sur-mesure.", order: 7 },
  { slug: "privatisations", name: "Privatisations", description: "Privatisez la salle, la terrasse ou l'espace VIP pour votre événement exclusif.", order: 8 },
];

const STORIES = [
  { slug: "coulisses-pizzas", category: "FOOD", title: "Dans les coulisses de nos pizzas", excerpt: "Notre chef pizzaiolo nous ouvre les portes du four à bois.", author: "Équipe GASPARD", image: "pizza" },
  { slug: "rencontre-chef", category: "PEOPLE", title: "Rencontre avec notre chef", excerpt: "Portrait du chef qui façonne l'identité culinaire de GASPARD Signature.", author: "Équipe GASPARD", image: "grill" },
  { slug: "dimanche-gaspard", category: "LIFESTYLE", title: "5 façons de profiter d'un dimanche chez GASPARD", excerpt: "Brunch, terrasse et farniente : notre guide du dimanche parfait.", author: "Équipe GASPARD", image: "breakfast" },
  { slug: "derniere-soiree", category: "EVENTS", title: "Retour sur notre dernière soirée", excerpt: "Ambiance, cocktails et bonne humeur : le récap de notre dernière soirée.", author: "Équipe GASPARD", image: "cocktail" },
  { slug: "adresses-cocody", category: "ABIDJAN", title: "Les adresses qui font vibrer Cocody", excerpt: "Notre sélection des lieux incontournables autour d'Angré.", author: "Équipe GASPARD", image: "interior" },
];

const GALLERY: Array<{ category: string; image: string; caption: string; featured?: boolean }> = [
  { category: "Plats", image: "pizza", caption: "Pizza au feu de bois", featured: true },
  { category: "Plats", image: "burger", caption: "GASPARD Signature Burger" },
  { category: "Plats", image: "grill", caption: "Côte de bœuf Black Angus" },
  { category: "Équipe", image: "team", caption: "Notre brigade en cuisine" },
  { category: "Architecture", image: "interior", caption: "Salle intérieure" },
  { category: "Architecture", image: "terrace", caption: "Notre terrasse" },
  { category: "Clients", image: "team", caption: "Moments partagés" },
  { category: "Événements", image: "event", caption: "Soirée privée" },
  { category: "Pâtisseries", image: "pastry", caption: "Sélection de pâtisseries" },
  { category: "Cocktails", image: "cocktail", caption: "GASPARD Signature Cocktail" },
  { category: "Plats", image: "dessert", caption: "Fondant au chocolat" },
  { category: "Architecture", image: "interior", caption: "Ambiance tamisée du soir" },
];

const TESTIMONIALS = [
  { author: "Aïcha K.", rating: 5, content: "Une expérience exceptionnelle, la pizza au feu de bois est incroyable et le service impeccable." },
  { author: "Marc D.", rating: 5, content: "Cadre magnifique, parfait pour un dîner en amoureux. La côte de bœuf est un must." },
  { author: "Fatou S.", rating: 4, content: "Super brunch du dimanche, ambiance chaleureuse et personnel très accueillant." },
  { author: "Yann B.", rating: 5, content: "Le meilleur burger d'Abidjan sans hésiter. On y retourne dès que possible." },
];

async function main() {
  console.log("Seeding...");

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.eventRequest.deleteMany();
  await prisma.giftCard.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.promotion.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.category.deleteMany();
  await prisma.eventCategory.deleteMany();
  await prisma.storyPost.deleteMany();
  await prisma.galleryImage.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.user.deleteMany();

  const categoryMap = new Map<string, string>();
  for (const cat of CATEGORIES) {
    const created = await prisma.category.create({ data: cat });
    categoryMap.set(cat.slug, created.id);
  }

  for (const [slug, items] of Object.entries(MENU)) {
    const categoryId = categoryMap.get(slug);
    if (!categoryId) continue;
    for (const item of items) {
      await prisma.menuItem.create({
        data: {
          name: item.name,
          description: item.description,
          price: item.price,
          image: item.image,
          ingredients: item.ingredients,
          allergens: item.allergens,
          chefPick: item.chefPick ?? false,
          categoryId,
        },
      });
    }
  }

  for (const cat of EVENT_CATEGORIES) {
    await prisma.eventCategory.create({ data: { ...cat, image: "event" } });
  }

  for (const story of STORIES) {
    await prisma.storyPost.create({
      data: {
        slug: story.slug,
        category: story.category,
        title: story.title,
        excerpt: story.excerpt,
        content: `${story.excerpt}\n\nGASPARD Signature continue de faire vivre l'art de la table à Cocody, entre gourmandise, élégance et convivialité. Suivez nos coulisses pour ne rien manquer de l'actualité de la maison.`,
        image: story.image,
        author: story.author,
      },
    });
  }

  for (let i = 0; i < GALLERY.length; i++) {
    const g = GALLERY[i];
    await prisma.galleryImage.create({
      data: { category: g.category, image: g.image, caption: g.caption, featured: g.featured ?? false, order: i },
    });
  }

  for (const t of TESTIMONIALS) {
    await prisma.testimonial.create({ data: t });
  }

  await prisma.promotion.create({
    data: {
      title: "Mardi Pizza",
      description: "-20% sur toutes les pizzas chaque mardi soir.",
      active: true,
    },
  });
  await prisma.promotion.create({
    data: {
      title: "Brunch du dimanche",
      description: "Formule brunch à volonté tous les dimanches de 10h à 15h.",
      active: true,
    },
  });

  const adminPassword = await bcrypt.hash("Gaspard2024!", 10);
  await prisma.user.create({
    data: {
      name: "Admin GASPARD",
      email: "admin@gaspard-signature.ci",
      passwordHash: adminPassword,
      role: "ADMIN",
      phone: "+2250700000000",
    },
  });

  const clientPassword = await bcrypt.hash("Client2024!", 10);
  await prisma.user.create({
    data: {
      name: "Client Démo",
      email: "client@gaspard-signature.ci",
      passwordHash: clientPassword,
      role: "CLIENT",
      phone: "+2250700000001",
      loyaltyPoints: 1250,
    },
  });

  console.log("Seed terminé.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
