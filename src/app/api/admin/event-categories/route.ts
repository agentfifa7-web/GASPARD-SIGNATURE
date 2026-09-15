import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export async function POST(req: Request) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { name, slug, description } = await req.json();
  if (!name || !slug) return NextResponse.json({ error: "Nom et slug requis." }, { status: 400 });

  const category = await prisma.eventCategory.create({
    data: { name, slug, description: description ?? "", image: "event", order: 0 },
  });
  return NextResponse.json({ category });
}
