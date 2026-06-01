"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminStore } from "@/store/adminStore";
import {
  LayoutDashboard,
  Car,
  CalendarCheck,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/cars", label: "Inventory", icon: Car },
  { href: "/admin/reservations", label: "Reservations", icon: CalendarCheck },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { username, logout } = useAdminStore();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    logout();
    window.location.href = "/admin/login";
  };

  const NavLinks = ({ onNavigate }: { onNavigate?: () => void }) => (
    <nav className="flex-1 px-3 py-4 space-y-1">
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
              active
                ? "bg-gold/15 text-gold"
                : "text-ink/50 hover:text-ink hover:bg-ink/5"
            }`}
          >
            <Icon className={`w-4 h-4 flex-shrink-0 ${active ? "text-gold" : "text-ink/50 group-hover:text-ink/70"}`} />
            <span>{label}</span>
            {active && <ChevronRight className="w-3 h-3 ml-auto text-gold/60" />}
          </Link>
        );
      })}
    </nav>
  );

  const UserFooter = () => (
    <div className="px-3 py-3 mx-3 mb-3 rounded-xl bg-ink/5 border border-ink/10">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0">
          <span className="text-gold text-xs font-bold uppercase">{username?.[0] ?? "A"}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-ink text-xs font-semibold truncate">{username ?? "Admin"}</p>
          <p className="text-ink/50 text-[10px]">Administrator</p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          title="Logout"
          className="p-1.5 rounded-lg text-ink/50 hover:text-red-400 hover:bg-red-400/10 transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-50 h-14 bg-[#0d1117] border-b border-white/6 flex items-center justify-between px-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gold flex items-center justify-center">
            <span className="text-dark text-xs font-black">J</span>
          </div>
          <span className="text-ink font-bold text-sm tracking-wide">JMK Admin</span>
        </div>
        <button type="button" onClick={() => setOpen(!open)} className="p-2 text-ink/50 hover:text-ink rounded-lg hover:bg-ink/5 transition-all">
          {open ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <aside className="relative w-64 bg-[#0d1117] border-r border-white/6 flex flex-col pt-14 z-50">
            <NavLinks onNavigate={() => setOpen(false)} />
            <UserFooter />
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 flex-shrink-0 flex-col bg-[#0d1117] border-r border-white/6 min-h-screen">
        {/* Logo */}
        <div className="px-4 pt-6 pb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gold flex items-center justify-center">
              <span className="text-dark text-sm font-black">J</span>
            </div>
            <div>
              <p className="text-ink font-bold text-sm leading-tight">JMK Admin</p>
              <p className="text-ink/50 text-[10px] leading-tight">Management Portal</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-4 h-px bg-ink/10 mb-2" />

        <NavLinks />

        <div className="mt-auto">
          <UserFooter />
        </div>
      </aside>
    </>
  );
}
