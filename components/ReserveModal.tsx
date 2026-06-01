"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle, Loader2 } from "lucide-react";
import { Car } from "@/types";
import { formatNaira } from "@/utils/format";

interface Props {
  car: Car;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ReserveModal({ car, onClose }: Props) {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const update = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ carId: car.id, ...form }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Submission failed. Please try again.");
        return;
      }
      setSuccess(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-ink/5 border border-ink/10 rounded-xl text-ink placeholder-ink/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all duration-200 text-sm";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink/75 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 bg-surface-2 rounded-2xl w-full max-w-md shadow-2xl border border-ink/10 overflow-hidden">
        {success ? (
          <div className="p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-9 h-9 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-ink mb-3 font-display">
              Reservation Sent!
            </h3>
            <p className="text-ink/70 leading-relaxed mb-7 text-sm">
              Thank you, <span className="text-ink font-semibold">{form.name}</span>! 🎉
              <br />
              Your reservation for the{" "}
              <span className="text-gold font-semibold">
                {car.year} {car.make} {car.model}
              </span>{" "}
              has been received. Our team will reach out within{" "}
              <span className="text-ink">2 hours</span>.
            </p>
            <button
              onClick={onClose}
              className="w-full btn-gold py-3.5 rounded-xl text-dark font-semibold"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-ink/8">
              <div>
                <h3 className="text-xl font-bold text-ink">
                  Reserve This Car
                </h3>
                <p className="text-ink/60 text-sm mt-1">
                  {car.year} {car.make} {car.model} ·{" "}
                  <span className="text-gold font-semibold">
                    {formatNaira(car.price)}
                  </span>
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-ink/10 rounded-xl transition-colors text-ink/60 hover:text-ink"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-ink/60 text-xs font-semibold uppercase tracking-wider mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={update("name")}
                  className={inputClass}
                  placeholder="e.g. Emeka Johnson"
                />
              </div>

              <div>
                <label className="block text-ink/60 text-xs font-semibold uppercase tracking-wider mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={update("email")}
                  className={inputClass}
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-ink/60 text-xs font-semibold uppercase tracking-wider mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={update("phone")}
                  className={inputClass}
                  placeholder="+234 80..."
                />
              </div>

              <div>
                <label className="block text-ink/60 text-xs font-semibold uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={update("message")}
                  rows={3}
                  className={`${inputClass} resize-none`}
                  placeholder="Any questions or special requirements..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-red py-4 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed text-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Reservation"
                )}
              </button>

              <p className="text-ink/50 text-[11px] text-center leading-relaxed">
                By submitting, you agree to be contacted by JMK Auto about this
                vehicle. We do not share your information with third parties.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
