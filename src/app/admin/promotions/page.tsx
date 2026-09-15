import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { PromotionsManager } from "@/components/admin/PromotionsManager";

export const metadata: Metadata = { title: "Admin — Promotions" };
export const dynamic = "force-dynamic";

export default async function AdminPromotionsPage() {
  const promotions = await prisma.promotion.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <AdminHeader title="Promotions" description="Créez et gérez vos offres" />
      <PromotionsManager promotions={promotions} />
    </div>
  );
}
