import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { EventsManager } from "@/components/admin/EventsManager";

export const metadata: Metadata = { title: "Admin — Événements" };
export const dynamic = "force-dynamic";

export default async function AdminEvenementsPage() {
  const [categories, requests] = await Promise.all([
    prisma.eventCategory.findMany({ orderBy: { order: "asc" } }),
    prisma.eventRequest.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div>
      <AdminHeader title="Événements" description="Créez et gérez les catégories d'événements et les demandes clients" />
      <EventsManager
        categories={categories}
        requests={requests.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() }))}
      />
    </div>
  );
}
