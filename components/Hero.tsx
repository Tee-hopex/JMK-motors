"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=85",
    tag: "New Arrivals",
    headline: "Premium Imported",
    highlight: "Luxury Cars",
    sub: "Premium Imported Cars · Trusted Quality · Best Prices in Nigeria",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1920&q=85",
    tag: "Foreign Used",
    headline: "Drive in Absolute",
    highlight: "Confidence",
    sub: "Every vehicle is inspected, documented, and ready for Nigerian roads",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1920&q=85",
    tag: "SUVs & Crossovers",
    headline: "Command Every",
    highlight: "Road",
    sub: "From Lagos highways to adventurous terrain — we have the perfect SUV for you",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1920&q=85",
    tag: "Executive Sedans",
    headline: "Arrive in Style",
    highlight: "Every Time",
    sub: "Mercedes, BMW, Lexus — handpicked for the Nigerian executive",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1920&q=85",
    tag: "Premium Selection",
    headline: "Your Dream Car",
    highlight: "Awaits You",
    sub: "Over 15 premium vehicles in stock. New inventory added weekly.",
  },
];

const stats = [
  { value: "500+", label: "Cars Sold" },
  { value: "5 ★", label: "Star Rated" },
  { value: "10+", label: "Years Exp." },
  { value: "100%", label: "Verified" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative min-h-[100svh] sm:h-screen sm:min-h-[680px] sm:max-h-[1000px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === current ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={idx !== current}
        >
          <Image
            src={slide.image}
            alt={slide.headline}
            fill
            className="object-cover"
            style={{
              transform: idx === current ? "scale(1)" : "scale(1.05)",
              transition: "transform 8s ease-out",
            }}
            priority={idx === 0}
            quality={85}
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/70 to-dark/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-dark/30" />
        </div>
      ))}

      {/* Content — top-anchored on mobile, centered on desktop */}
      <div className="relative z-10 h-full flex flex-col justify-start sm:justify-center pt-28 pb-24 sm:pt-0 sm:pb-0">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">

            {/* Tag */}
            <div
              key={`tag-${current}`}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-[11px] font-semibold tracking-wider uppercase mb-4 sm:mb-6 animate-fade-in"
            >
              <span className="w-1.5 h-1.5 bg-gold rounded-full" />
              {slides[current].tag}
            </div>

            {/* Headline */}
            <h1
              key={`h1-${current}`}
              className="text-[2.6rem] leading-[1.1] sm:text-5xl lg:text-7xl font-bold text-ink mb-3 sm:mb-5 font-display animate-fade-up"
            >
              {slides[current].headline}
              <span className="block gold-text mt-1">{slides[current].highlight}</span>
            </h1>

            {/* Subtitle */}
            <p
              key={`sub-${current}`}
              className="text-silver-light text-sm sm:text-lg lg:text-xl leading-relaxed mb-5 sm:mb-8 max-w-md sm:max-w-xl animate-fade-up"
              style={{ animationDelay: "0.12s" }}
            >
              {slides[current].sub}
            </p>

            {/* CTAs — full-width equal buttons on mobile */}
            <div
              className="flex gap-3 animate-fade-up"
              style={{ animationDelay: "0.22s" }}
            >
              <Link
                href="/cars"
                className="btn-red flex-1 sm:flex-none px-5 sm:px-8 py-3 sm:py-4 rounded-xl text-sm sm:text-base font-semibold text-center"
              >
                Browse Inventory
              </Link>
              <a
                href="https://wa.me/2348012345678"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex-1 sm:flex-none px-5 sm:px-8 py-3 sm:py-4 rounded-xl text-sm sm:text-base text-center"
              >
                WhatsApp Us
              </a>
            </div>

            {/* Stats — 2×2 grid on mobile, single row on desktop */}
            <div
              className="grid grid-cols-4 sm:flex sm:flex-wrap sm:gap-8 gap-x-2 gap-y-3 mt-6 sm:mt-12 pt-5 sm:pt-10 border-t border-ink/15 animate-fade-up"
              style={{ animationDelay: "0.32s" }}
            >
              {stats.map(({ value, label }) => (
                <div key={label} className="text-center sm:text-left">
                  <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-gold leading-none">
                    {value}
                  </p>
                  <p className="text-silver text-[10px] sm:text-xs mt-1 tracking-wide leading-tight">
                    {label}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Arrow Controls — smaller on mobile, pushed below content */}
      <button
        onClick={prev}
        className="absolute left-3 sm:left-8 bottom-16 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-20 p-2.5 sm:p-3 glass rounded-full hover:bg-ink/20 transition-all duration-200 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-ink" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 sm:right-8 bottom-16 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-20 p-2.5 sm:p-3 glass rounded-full hover:bg-ink/20 transition-all duration-200 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-ink" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-14 sm:bottom-14 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-400 rounded-full ${
              idx === current
                ? "w-6 sm:w-7 h-1.5 sm:h-2 bg-gold"
                : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-ink/30 hover:bg-ink/60"
            }`}
          />
        ))}
      </div>

      {/* Slide counter — hidden on mobile to reduce clutter */}
      <div className="hidden sm:block absolute bottom-8 right-10 z-20 text-silver/60 text-sm font-mono">
        {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </div>
    </section>
  );
}
