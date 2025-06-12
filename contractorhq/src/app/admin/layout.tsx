// app/admin/layout.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminShell from "@/components/ui/AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  // (Optional) Check for role
  if (session.user.role !== "admin") {
    redirect("/unauthorized");
  }

  return <AdminShell>{children}</AdminShell>;
}
