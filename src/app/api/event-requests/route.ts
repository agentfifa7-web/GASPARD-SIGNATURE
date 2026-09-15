import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const body = await req.json();
  const { type, guests, date, budget, ambiance, name, email, phone } = body ?? {};

  if (!type || !guests || !date || !name || !email || !phone) {
    return NextResponse.json({ error: "Merci de remplir tous les champs obligatoires." }, { status: 400 });
  }

  const session = await auth();

  const request = await prisma.eventRequest.create({
    data: {
      userId: session?.user?.id,
      type,
      guests: Number(guests),
      date,
      budget: budget ?? "Non précisé",
      ambiance: ambiance ?? "Non précisé",
      name,
      email,
      phone,
    },
  });

  return NextResponse.json({ request });
}
