"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/cars", label: "Inventory" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled || menuOpen ? "navbar-scrolled" : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gold text-dark font-black text-lg leading-none transition-transform duration-300 group-hover:scale-110">
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

            {/* Desktop Nav */}
            <ul className="hidden md:flex items-center gap-1">
              {navLinks.map(({ href, label }) => {
                const active =
                  pathname === href ||
                  (href !== "/" && pathname.startsWith(href));
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group
                        ${
                          active
                            ? "text-gold"
                            : "text-ink/60 hover:text-ink"
                        }
                      `}
                    >
                      {label}
                      <span
                        className={`absolute bottom-1 left-4 right-4 h-0.5 bg-gold rounded-full transition-transform duration-300 origin-left
                          ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="tel:+2348012345678"
                className="text-ink/70 hover:text-ink text-sm transition-colors"
              >
                +234 801 234 5678
              </a>
              <ThemeToggle />
              <Link
                href="/cars"
                className="btn-red px-5 py-2.5 rounded-lg text-sm"
              >
                View Inventory
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-ink hover:bg-ink/10 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-30 md:hidden transition-all duration-400 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute top-20 left-0 right-0 glass-dark mx-4 rounded-2xl overflow-hidden transition-all duration-400 ${
            menuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          <ul className="py-3">
            {navLinks.map(({ href, label }) => {
              const active =
                pathname === href ||
                (href !== "/" && pathname.startsWith(href));
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center px-6 py-4 text-base font-medium border-b border-ink/10 last:border-0 transition-colors
                      ${active ? "text-gold bg-gold/5" : "text-ink hover:bg-ink/5"}`}
                  >
                    {label}
                    {active && (
                      <span className="ml-auto w-2 h-2 bg-gold rounded-full" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="px-6 pb-6 pt-3 flex flex-col gap-3">
            <div className="flex items-center justify-between pb-3 border-b border-ink/10">
              <span className="text-sm font-medium text-ink">Theme</span>
              <ThemeToggle />
            </div>
            <Link
              href="/cars"
              className="btn-red py-3 rounded-xl text-center text-sm"
            >
              View Full Inventory
            </Link>
            <a
              href="tel:+2348012345678"
              className="py-3 rounded-xl border border-ink/20 text-ink text-center text-sm hover:bg-ink/5 transition-colors"
            >
              Call: +234 801 234 5678
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
