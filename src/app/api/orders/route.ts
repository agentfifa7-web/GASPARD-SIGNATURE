import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const body = await req.json();
  const { mode, name, phone, address, paymentMethod, items } = body ?? {};

  if (!mode || !name || !phone || !paymentMethod || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Commande invalide." }, { status: 400 });
  }

  if (mode === "LIVRAISON" && !address) {
    return NextResponse.json({ error: "Adresse requise pour la livraison." }, { status: 400 });
  }

  const session = await auth();

  const menuItems = await prisma.menuItem.findMany({
    where: { id: { in: items.map((i: { id: string }) => i.id) } },
  });
  const priceMap = new Map(menuItems.map((m) => [m.id, m.price]));

  const total = items.reduce(
    (sum: number, i: { id: string; quantity: number }) => sum + (priceMap.get(i.id) ?? 0) * i.quantity,
    0
  );

  const order = await prisma.order.create({
    data: {
      userId: session?.user?.id,
      mode,
      name,
      phone,
      address,
      paymentMethod,
      total,
      items: {
        create: items.map((i: { id: string; quantity: number; notes?: string }) => ({
          menuItemId: i.id,
          quantity: i.quantity,
          unitPrice: priceMap.get(i.id) ?? 0,
          notes: i.notes,
        })),
      },
    },
    include: { items: { include: { menuItem: true } } },
  });

  if (session?.user?.id) {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { loyaltyPoints: { increment: Math.floor(total / 100) } },
    });
  }

  return NextResponse.json({ order });
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ orders: [] });
  }
  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: { items: { include: { menuItem: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ orders });
}
