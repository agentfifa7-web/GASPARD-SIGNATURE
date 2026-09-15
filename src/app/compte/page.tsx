import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/SectionHeading";
import { AccountDashboard } from "@/components/compte/AccountDashboard";

export const metadata: Metadata = { title: "Mon GASPARD" };

export default async function ComptePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/connexion");

  const [user, reservations, orders, favorites] = await Promise.all([
    prisma.user.findUnique({ where: { id: session.user.id } }),
    prisma.reservation.findMany({ where: { userId: session.user.id }, orderBy: { createdAt: "desc" } }),
    prisma.order.findMany({
      where: { userId: session.user.id },
      include: { items: { include: { menuItem: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.favorite.findMany({ where: { userId: session.user.id }, include: { menuItem: true } }),
  ]);

  if (!user) redirect("/connexion");

  return (
    <div className="pb-24 pt-32">
      <Container>
        <AccountDashboard
          user={{ name: user.name, email: user.email, loyaltyPoints: user.loyaltyPoints, birthday: user.birthday }}
          reservations={reservations.map((r) => ({
            id: r.id,
            date: r.date,
            time: r.time,
            guests: r.guests,
            space: r.space,
            occasion: r.occasion,
            status: r.status,
          }))}
          orders={orders.map((o) => ({
            id: o.id,
            mode: o.mode,
            status: o.status,
            total: o.total,
            createdAt: o.createdAt.toISOString(),
            items: o.items.map((i) => ({ id: i.id, quantity: i.quantity, menuItem: { name: i.menuItem.name, image: i.menuItem.image } })),
          }))}
          favorites={favorites.map((f) => ({
            id: f.id,
            menuItem: { id: f.menuItem.id, name: f.menuItem.name, price: f.menuItem.price, image: f.menuItem.image },
          }))}
        />
      </Container>
    </div>
  );
}
