import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { id } = await params;
  const { status } = await req.json();

  const reservation = await prisma.reservation.update({ where: { id }, data: { status } });
  return NextResponse.json({ reservation });
}
