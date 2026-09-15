import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminMobileNav } from "@/components/admin/AdminMobileNav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    redirect("/connexion?callbackUrl=/admin");
  }

  return (
    <div className="min-h-screen bg-ivoire">
      <AdminSidebar />
      <AdminMobileNav />
      <div className="lg:pl-64">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">{children}</div>
      </div>
    </div>
  );
}
