import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ReservationsBoard } from "@/components/admin/ReservationsBoard";

export const metadata: Metadata = { title: "Admin — Réservations" };
export const dynamic = "force-dynamic";

export default async function AdminReservationsPage() {
  const reservations = await prisma.reservation.findMany({ orderBy: [{ date: "desc" }, { time: "asc" }] });

  return (
    <div>
      <AdminHeader title="Réservations" description="Calendrier des réservations" />
      <ReservationsBoard reservations={reservations} />
    </div>
  );
}
