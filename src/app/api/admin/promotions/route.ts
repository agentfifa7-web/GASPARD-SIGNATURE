import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export async function POST(req: Request) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { title, description, startDate, endDate } = await req.json();
  if (!title || !description) return NextResponse.json({ error: "Titre et description requis." }, { status: 400 });

  const promotion = await prisma.promotion.create({
    data: { title, description, startDate, endDate, active: true },
  });
  return NextResponse.json({ promotion });
}
