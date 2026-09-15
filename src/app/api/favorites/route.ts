import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Connectez-vous pour ajouter des favoris." }, { status: 401 });
  }

  const { menuItemId } = await req.json();
  if (!menuItemId) return NextResponse.json({ error: "menuItemId requis" }, { status: 400 });

  const existing = await prisma.favorite.findUnique({
    where: { userId_menuItemId: { userId: session.user.id, menuItemId } },
  });

  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } });
    return NextResponse.json({ favorited: false });
  }

  await prisma.favorite.create({ data: { userId: session.user.id, menuItemId } });
  return NextResponse.json({ favorited: true });
}
