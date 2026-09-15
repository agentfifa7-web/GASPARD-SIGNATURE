import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { MenuManager } from "@/components/admin/MenuManager";

export const metadata: Metadata = { title: "Admin — Menu" };
export const dynamic = "force-dynamic";

export default async function AdminMenuPage() {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: { menuItems: { orderBy: { createdAt: "desc" } } },
  });

  return (
    <div>
      <AdminHeader title="Menu" description="Modifiez plats, prix, visuels, disponibilité et catégories sans toucher au code" />
      <MenuManager categories={categories} />
    </div>
  );
}
