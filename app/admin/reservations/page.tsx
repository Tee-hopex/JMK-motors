"use client";

import { useEffect, useState, useCallback } from "react";
import { Trash2, ChevronDown, CalendarCheck } from "lucide-react";

interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  status: string;
  createdAt: string;
  car: { make: string; model: string; year: number };
}

const statusConfig: Record<string, { label: string; cls: string }> = {
  pending:   { label: "Pending",   cls: "bg-amber-500/15 text-amber-400 border-amber-500/20" },
  confirmed: { label: "Confirmed", cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" },
  completed: { label: "Completed", cls: "bg-blue-500/15 text-blue-400 border-blue-500/20" },
  cancelled: { label: "Cancelled", cls: "bg-red-500/15 text-red-400 border-red-500/20" },
};

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/reservations");
      if (res.ok) {
        const data = await res.json();
        setReservations(Array.isArray(data) ? data : []);
      } else {
        setReservations([]);
      }
    } catch {
      setReservations([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/reservations/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  };

  const deleteReservation = async (id: string) => {
    await fetch(`/api/reservations/${id}`, { method: "DELETE" });
    setExpanded(null);
    load();
  };

  const pending = reservations.filter((r) => r.status === "pending").length;

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <div className="mb-6">
        <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mb-1">Management</p>
        <h1 className="text-2xl font-bold text-ink">Reservations</h1>
        <p className="text-slate-500 text-sm mt-1">
          {loading ? "Loading reservations..." : (
            <>
              {reservations.length} total
              {pending > 0 && <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-lg bg-amber-500/15 text-amber-400 text-xs font-medium border border-amber-500/20">{pending} pending</span>}
            </>
          )}
        </p>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => <div key={i} className="bg-[#0f1520] border border-white/6 rounded-xl h-16 animate-pulse" />)}
        </div>
      ) : reservations.length === 0 ? (
        <div className="bg-[#0f1520] border border-white/6 rounded-2xl py-20 text-center">
          <CalendarCheck className="w-8 h-8 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">No reservations yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {reservations.map((r) => {
            const sc = statusConfig[r.status] ?? { label: r.status, cls: "bg-ink/8 text-ink/60 border-ink/10" };
            const isOpen = expanded === r.id;
            return (
              <div key={r.id} className={`bg-[#0f1520] border rounded-xl overflow-hidden transition-colors ${isOpen ? "border-white/12" : "border-white/6"}`}>
                <button
                  type="button"
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/2 transition-colors"
                  onClick={() => setExpanded(isOpen ? null : r.id)}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="min-w-0">
                      <p className="text-ink font-medium text-sm truncate">{r.name}</p>
                      <p className="text-slate-500 text-xs mt-0.5">
                        {r.car.year} {r.car.make} {r.car.model}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                    <span className={`hidden sm:inline-flex items-center px-2 py-0.5 rounded-lg text-[11px] font-medium border ${sc.cls}`}>
                      {sc.label}
                    </span>
                    <span className="text-slate-600 text-xs hidden md:block">
                      {new Date(r.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 border-t border-white/6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-1">Email</p>
                        <p className="text-ink text-sm">{r.email}</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-1">Phone</p>
                        <p className="text-ink text-sm">{r.phone}</p>
                      </div>
                      {r.message && (
                        <div className="sm:col-span-2">
                          <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-1">Message</p>
                          <p className="text-ink text-sm leading-relaxed">{r.message}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 mt-5">
                      <select
                        aria-label="Update reservation status"
                        value={r.status}
                        onChange={(e) => updateStatus(r.id, e.target.value)}
                        className="bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-gold/30 transition-all"
                      >
                        {["pending", "confirmed", "completed", "cancelled"].map((s) => (
                          <option key={s} value={s} className="bg-[#0f1520] capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        aria-label="Delete reservation"
                        onClick={() => deleteReservation(r.id)}
                        className="p-2 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-all ml-auto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
