import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export async function GET() {
  const categories = await prisma.category.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json({ categories });
}

export async function POST(req: Request) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { name, slug, order } = await req.json();
  if (!name || !slug) return NextResponse.json({ error: "Nom et slug requis." }, { status: 400 });

  const category = await prisma.category.create({ data: { name, slug, order: order ?? 0 } });
  return NextResponse.json({ category });
}
