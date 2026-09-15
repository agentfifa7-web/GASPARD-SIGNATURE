import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { id } = await params;
  const body = await req.json();
  const { name, description, price, image, ingredients, allergens, chefPick, available, categoryId } = body ?? {};

  const item = await prisma.menuItem.update({
    where: { id },
    data: {
      ...(name !== undefined && { name }),
      ...(description !== undefined && { description }),
      ...(price !== undefined && { price: Number(price) }),
      ...(image !== undefined && { image }),
      ...(ingredients !== undefined && { ingredients }),
      ...(allergens !== undefined && { allergens }),
      ...(chefPick !== undefined && { chefPick }),
      ...(available !== undefined && { available }),
      ...(categoryId !== undefined && { categoryId }),
    },
  });

  return NextResponse.json({ item });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { id } = await params;
  await prisma.menuItem.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
