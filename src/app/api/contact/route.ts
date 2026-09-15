import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, subject, message } = body ?? {};

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Merci de remplir tous les champs." }, { status: 400 });
  }

  const contactMessage = await prisma.contactMessage.create({
    data: { name, email, subject, message },
  });

  return NextResponse.json({ contactMessage });
}
