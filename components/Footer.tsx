"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
} from "lucide-react";

interface Settings {
  phone: string;
  address: string;
  instagram: string;
  facebook: string;
}

const quickLinks = [
  { href: "/cars", label: "Browse Inventory" },
  { href: "/cars?condition=Brand+New", label: "Brand New Cars" },
  { href: "/cars?condition=Foreign+Used", label: "Foreign Used" },
  { href: "/services", label: "Our Services" },
  { href: "/about", label: "About JMK Auto" },
];

const services = [
  "Vehicle Importation",
  "Car Sales & Trading",
  "Nationwide Delivery",
  "Documentation & Clearance",
  "Trade-In & Valuation",
  "Financing Assistance",
];

const defaultSocials = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export default function Footer() {
  const [settings, setSettings] = useState<Settings>({
    phone: "+234 801 234 5678",
    address: "15 Admiralty Way, Lekki Phase 1, Lagos, Nigeria",
    instagram: "",
    facebook: "",
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => setSettings((p) => ({ ...p, ...data })))
      .catch(() => {}); // Use defaults if API fails
  }, []);

  const socials = [
    ...(settings.instagram ? [{ icon: Instagram, href: settings.instagram, label: "Instagram" }] : []),
    { icon: Twitter, href: "#", label: "Twitter" },
    ...(settings.facebook ? [{ icon: Facebook, href: settings.facebook, label: "Facebook" }] : []),
    { icon: Youtube, href: "#", label: "YouTube" },
  ];
  return (
    <footer className="bg-surface-2 border-t border-ink/8">
      {/* Top CTA strip */}
      <div
        className="py-5 px-4 text-center"
        style={{
          background:
            "linear-gradient(90deg, rgb(var(--surface)) 0%, rgb(var(--surface-3)) 50%, rgb(var(--surface)) 100%)",
          borderBottom: "1px solid rgba(212,175,55,0.15)",
        }}
      >
        <p className="text-silver text-sm">
          🚗 &nbsp;New arrivals every week.{" "}
          <Link href="/cars" className="text-gold hover:underline font-semibold">
            Check our latest inventory →
          </Link>
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-5 w-fit">
              <div className="w-10 h-10 rounded-lg bg-gold flex items-center justify-center text-dark font-black text-lg">
                J
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-ink font-black text-xl tracking-wider">
                  JMK
                </span>
                <span className="text-gold text-[9px] tracking-[0.2em] font-semibold uppercase">
                  Auto Premium
                </span>
              </div>
            </Link>
            <p className="text-silver text-sm leading-relaxed mb-6">
              Nigeria&apos;s most trusted premium car dealership. We source,
              import, and deliver the finest vehicles with unmatched
              transparency.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-ink/5 hover:bg-gold/20 hover:text-gold text-ink/60 flex items-center justify-center transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-ink font-semibold mb-5 text-sm uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-silver hover:text-gold text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gold/40 rounded-full group-hover:bg-gold transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-ink font-semibold mb-5 text-sm uppercase tracking-widest">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li
                  key={s}
                  className="text-silver text-sm flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-gold/40 rounded-full" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-ink font-semibold mb-5 text-sm uppercase tracking-widest">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-silver text-sm leading-relaxed">
                  {settings.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <a
                  href={`tel:${settings.phone.replace(/\D/g, "")}`}
                  className="text-silver hover:text-gold text-sm transition-colors"
                >
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a
                  href="mailto:info@jmkauto.ng"
                  className="text-silver hover:text-gold text-sm transition-colors"
                >
                  info@jmkauto.ng
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <div className="text-silver text-sm">
                  <p>Mon – Sat: 8:00 AM – 7:00 PM</p>
                  <p>Sunday: 10:00 AM – 4:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-ink/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-silver/60 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} JMK Auto Premium. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-silver/60 text-sm">
            <Link href="#" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-gold transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
