import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, phone, guests, date, time, occasion, space, notes } = body ?? {};

  if (!name || !email || !phone || !guests || !date || !time || !occasion || !space) {
    return NextResponse.json({ error: "Merci de remplir tous les champs obligatoires." }, { status: 400 });
  }

  const session = await auth();

  const reservation = await prisma.reservation.create({
    data: {
      userId: session?.user?.id,
      name,
      email,
      phone,
      guests: Number(guests),
      date,
      time,
      occasion,
      space,
      notes,
      status: "CONFIRMED",
    },
  });

  return NextResponse.json({ reservation });
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ reservations: [] });
  }
  const reservations = await prisma.reservation.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ reservations });
}
