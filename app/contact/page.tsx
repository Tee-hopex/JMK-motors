"use client";

import { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Loader2,
  CheckCircle,
  MessageSquare,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface Settings {
  phone: string;
  address: string;
  instagram: string;
  facebook: string;
}

const subjects = [
  "I want to buy a car",
  "Car importation inquiry",
  "Trade-in / Valuation",
  "Financing inquiry",
  "Documentation help",
  "After-sale support",
  "General inquiry",
];

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [settings, setSettings] = useState<Settings>({
    phone: "+234 801 234 5678",
    address: "15 Admiralty Way, Lekki Phase 1, Lagos",
    instagram: "",
    facebook: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => setSettings((p) => ({ ...p, ...data })))
      .catch(() => {}); // Use defaults if API fails
  }, []);

  const contactInfo = [
    {
      icon: MapPin,
      label: "Our Address",
      value: settings.address,
      sub: "Also available in Abuja by appointment",
      href: "#",
    },
    {
      icon: Phone,
      label: "Phone & WhatsApp",
      value: settings.phone,
      sub: "",
      href: `tel:${settings.phone.replace(/\D/g, "")}`,
    },
    {
      icon: Mail,
      label: "Email Address",
      value: "info@jmkauto.ng",
      sub: "sales@jmkauto.ng",
      href: "mailto:info@jmkauto.ng",
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: "Mon – Sat: 8:00 AM – 7:00 PM",
      sub: "Sunday: 10:00 AM – 4:00 PM",
      href: null,
    },
  ];

  const update =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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
    "w-full px-4 py-3.5 bg-ink/5 border border-ink/10 rounded-xl text-ink placeholder-ink/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all duration-200 text-sm";

  const waMessage = encodeURIComponent(
    "Hello JMK Auto! 👋 I'd like to make an enquiry. Please can you assist me?"
  );

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-2/50 to-dark" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">
                We&apos;re Here to Help
              </p>
              <h1 className="text-5xl sm:text-6xl font-bold text-ink font-display leading-tight mb-5">
                Get In Touch
              </h1>
              <p className="text-silver-light text-xl leading-relaxed">
                Have questions about a car or need help finding your perfect
                vehicle? Our team responds within 2 hours during business hours.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-8 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-4">
              {contactInfo.map((c) => {
                const Icon = c.icon;
                const Wrapper = c.href ? "a" : "div";
                return (
                  <AnimatedSection key={c.label}>
                    <Wrapper
                      {...(c.href ? { href: c.href } : {})}
                      className="flex items-start gap-4 p-5 bg-surface-2 rounded-2xl border border-ink/8 hover:border-gold/20 transition-all duration-300 group block"
                    >
                      <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                        <Icon className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-silver text-xs uppercase tracking-wider mb-1">
                          {c.label}
                        </p>
                        <p className="text-ink font-semibold text-sm">
                          {c.value}
                        </p>
                        <p className="text-silver text-xs mt-0.5">{c.sub}</p>
                      </div>
                    </Wrapper>
                  </AnimatedSection>
                );
              })}

              {/* WhatsApp Quick CTA */}
              <AnimatedSection delay={300}>
                <a
                  href={`https://wa.me/2348012345678?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-2xl border border-[#25D366]/20 bg-[#25D366]/5 hover:bg-[#25D366]/10 hover:border-[#25D366]/40 transition-all duration-300 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#25D366]/15 flex items-center justify-center flex-shrink-0">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 fill-[#25D366]"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-ink font-semibold text-sm">
                      Chat on WhatsApp
                    </p>
                    <p className="text-silver text-xs mt-0.5">
                      Fastest way to reach us
                    </p>
                  </div>
                </a>
              </AnimatedSection>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <AnimatedSection delay={100}>
                <div className="bg-surface-2 rounded-2xl border border-ink/8 overflow-hidden">
                  {success ? (
                    <div className="p-12 text-center">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-5">
                        <CheckCircle className="w-9 h-9 text-emerald-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-ink mb-3 font-display">
                        Message Received!
                      </h3>
                      <p className="text-silver leading-relaxed mb-7">
                        Thank you, <span className="text-ink font-semibold">{form.name}</span>!
                        We&apos;ve received your message and will get back to you
                        within <span className="text-gold font-semibold">2 hours</span> during
                        business hours.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                          onClick={() => {
                            setSuccess(false);
                            setForm({
                              name: "",
                              email: "",
                              phone: "",
                              subject: "",
                              message: "",
                            });
                          }}
                          className="btn-outline px-7 py-3 rounded-xl text-sm"
                        >
                          Send Another Message
                        </button>
                        <a
                          href={`https://wa.me/2348012345678?text=${waMessage}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-7 py-3 bg-[#25D366] hover:bg-[#128C7E] rounded-xl text-white text-sm font-semibold transition-colors text-center"
                        >
                          WhatsApp Us Instead
                        </a>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
                      <div>
                        <h2 className="text-xl font-bold text-ink mb-1">
                          Send Us a Message
                        </h2>
                        <p className="text-silver text-sm">
                          Fill in the form below and we&apos;ll get right back to you.
                        </p>
                      </div>

                      {error && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3">
                          {error}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-silver text-xs font-semibold uppercase tracking-wider mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={form.name}
                            onChange={update("name")}
                            className={inputClass}
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-silver text-xs font-semibold uppercase tracking-wider mb-2">
                            Phone Number *
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
                      </div>

                      <div>
                        <label className="block text-silver text-xs font-semibold uppercase tracking-wider mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={update("email")}
                          className={inputClass}
                          placeholder="john@email.com"
                        />
                      </div>

                      <div>
                        <label className="block text-silver text-xs font-semibold uppercase tracking-wider mb-2">
                          Subject *
                        </label>
                        <select
                          required
                          value={form.subject}
                          onChange={update("subject")}
                          className={`${inputClass} appearance-none cursor-pointer`}
                        >
                          <option value="" disabled className="bg-surface-2">
                            What can we help you with?
                          </option>
                          {subjects.map((s) => (
                            <option key={s} value={s} className="bg-surface-2">
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-silver text-xs font-semibold uppercase tracking-wider mb-2">
                          Message *
                        </label>
                        <textarea
                          required
                          value={form.message}
                          onChange={update("message")}
                          rows={5}
                          className={`${inputClass} resize-none`}
                          placeholder="Tell us about the car you're looking for, your budget, or any other details..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-red py-4 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* Map Placeholder */}
          <AnimatedSection delay={200}>
            <div className="mt-10 rounded-2xl overflow-hidden border border-ink/8 relative h-64 sm:h-80 bg-surface-2">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-gold" />
                </div>
                <div className="text-center">
                  <p className="text-ink font-semibold">
                    15 Admiralty Way, Lekki Phase 1, Lagos
                  </p>
                  <p className="text-silver text-sm mt-1">
                    Open: Mon – Sat 8:00 AM – 7:00 PM
                  </p>
                </div>
                <a
                  href="https://maps.google.com/?q=Lekki+Phase+1+Lagos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold px-6 py-2.5 rounded-lg text-sm font-semibold"
                >
                  Open in Google Maps
                </a>
              </div>
              {/* Decorative grid */}
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern
                      id="grid"
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="#D4AF37"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
