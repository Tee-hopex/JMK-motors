"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Force dark mode on admin panel
  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  }, []);

  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-surface text-ink">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-surface-2 text-ink">
      <AdminSidebar />
      <div className="flex-1 flex flex-col md:ml-0 pt-14 md:pt-0 min-w-0 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
