import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export async function POST(req: Request) {
  const { response } = await requireAdmin();
  if (response) return response;

  const body = await req.json();
  const { name, description, price, image, ingredients, allergens, chefPick, available, categoryId } = body ?? {};

  if (!name || !price || !categoryId) {
    return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
  }

  const item = await prisma.menuItem.create({
    data: {
      name,
      description: description ?? "",
      price: Number(price),
      image: image ?? "signature",
      ingredients: ingredients ?? "",
      allergens: allergens ?? "",
      chefPick: !!chefPick,
      available: available ?? true,
      categoryId,
    },
  });

  return NextResponse.json({ item });
}
