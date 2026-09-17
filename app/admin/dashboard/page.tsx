"use client";

import { useEffect, useState } from "react";
import { Car, CalendarCheck, MessageSquare, TrendingUp, ArrowUpRight, Package, Clock, MailOpen } from "lucide-react";
import { formatNaira } from "@/utils/format";
import Link from "next/link";

interface Stats {
  totalCars: number;
  featuredCars: number;
  soldCars: number;
  totalReservations: number;
  pendingReservations: number;
  totalMessages: number;
  unreadMessages: number;
  totalValue: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [carsRes, reservRes, msgRes] = await Promise.all([
          fetch("/api/cars"),
          fetch("/api/reservations"),
          fetch("/api/messages"),
        ]);
        const [carsData, reservData, msgData] = await Promise.all([
          carsRes.ok ? carsRes.json() : [],
          reservRes.ok ? reservRes.json() : [],
          msgRes.ok ? msgRes.json() : [],
        ]);
        const cars = Array.isArray(carsData) ? carsData : [];
        const reservations = Array.isArray(reservData) ? reservData : [];
        const messages = Array.isArray(msgData) ? msgData : [];
        setStats({
          totalCars: cars.length,
          featuredCars: cars.filter((c: { featured: boolean }) => c.featured).length,
          soldCars: cars.filter((c: { sold: boolean }) => c.sold).length,
          totalReservations: reservations.length,
          pendingReservations: reservations.filter((r: { status: string }) => r.status === "pending").length,
          totalMessages: messages.length,
          unreadMessages: messages.filter((m: { read: boolean }) => !m.read).length,
          totalValue: cars.reduce((sum: number, c: { price: number }) => sum + (c.price || 0), 0),
        });
      } catch {
        console.error("Failed to load stats");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const statCards = stats ? [
    {
      label: "Total Inventory",
      value: stats.totalCars,
      sub: `${stats.featuredCars} featured · ${stats.soldCars} sold`,
      icon: Package,
      accent: "#D4AF37",
      href: "/admin/cars",
    },
    {
      label: "Portfolio Value",
      value: formatNaira(stats.totalValue),
      sub: "combined listing value",
      icon: TrendingUp,
      accent: "#34d399",
      href: "/admin/cars",
    },
    {
      label: "Reservations",
      value: stats.totalReservations,
      sub: `${stats.pendingReservations} awaiting response`,
      icon: CalendarCheck,
      accent: "#60a5fa",
      href: "/admin/reservations",
    },
    {
      label: "Messages",
      value: stats.totalMessages,
      sub: `${stats.unreadMessages} unread`,
      icon: MailOpen,
      accent: "#c084fc",
      href: "/admin/messages",
    },
  ] : [];

  const quickLinks = [
    { label: "Add New Car", href: "/admin/cars", icon: Car, desc: "List a vehicle in inventory" },
    { label: "View Reservations", href: "/admin/reservations", icon: CalendarCheck, desc: "Manage booking requests" },
    { label: "Read Messages", href: "/admin/messages", icon: MessageSquare, desc: "Customer enquiries" },
    { label: "Update Settings", href: "/admin/settings", icon: Clock, desc: "Site & contact info" },
  ];

  return (
    <div className="p-6 md:p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mb-1">Overview</p>
        <h1 className="text-2xl font-bold text-ink">Dashboard</h1>
        {loading && <p className="text-slate-500 text-sm mt-1">Loading data...</p>}
      </div>

      {/* Stat cards */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-surface-2 border border-ink/6 rounded-2xl h-28 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map(({ label, value, sub, icon: Icon, accent, href }) => (
            <Link key={label} href={href} className="group block bg-surface-2 border border-ink/6 rounded-2xl p-5 hover:border-ink/12 hover:bg-surface-2 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${accent}18` }}
                >
                  <Icon className="w-4 h-4" style={{ color: accent }} />
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-colors" />
              </div>
              <p className="text-xl font-bold text-ink mb-0.5">{value}</p>
              <p className="text-xs font-medium text-slate-400">{label}</p>
              <p className="text-[11px] text-slate-600 mt-0.5">{sub}</p>
            </Link>
          ))}
        </div>
      )}

      {/* Quick actions */}
      <div className="mb-8">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-4">Quick Actions</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {quickLinks.map(({ label, href, icon: Icon, desc }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center gap-3 bg-surface-2 border border-ink/6 rounded-xl px-4 py-3.5 hover:border-gold/25 hover:bg-surface-2 transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                <Icon className="w-3.5 h-3.5 text-gold" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-ink leading-tight">{label}</p>
                <p className="text-[11px] text-slate-500 truncate">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Status bar */}
      {stats && (
        <div className="bg-surface-2 border border-ink/6 rounded-2xl px-6 py-4 flex flex-wrap gap-6">
          {[
            { label: "Available Cars", value: stats.totalCars - stats.soldCars, color: "text-emerald-400" },
            { label: "Sold Cars", value: stats.soldCars, color: "text-slate-400" },
            { label: "Featured", value: stats.featuredCars, color: "text-gold" },
            { label: "Pending Bookings", value: stats.pendingReservations, color: "text-blue-400" },
            { label: "Unread Messages", value: stats.unreadMessages, color: "text-purple-400" },
          ].map(({ label, value, color }) => (
            <div key={label}>
              <p className={`text-lg font-bold ${color}`}>{value}</p>
              <p className="text-[11px] text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
