import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

function generateCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "GASPARD-";
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function POST(req: Request) {
  const body = await req.json();
  const { amount, fromName, toName, message } = body ?? {};

  if (!amount || !fromName || !toName) {
    return NextResponse.json({ error: "Champs manquants." }, { status: 400 });
  }

  const session = await auth();

  const giftCard = await prisma.giftCard.create({
    data: {
      code: generateCode(),
      amount: Number(amount),
      fromName,
      toName,
      message,
      userId: session?.user?.id,
    },
  });

  return NextResponse.json({ giftCard });
}
