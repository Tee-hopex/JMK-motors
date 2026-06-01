"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Car } from "@/types";
import CarCard from "./CarCard";
import CarModal from "./CarModal";
import ReserveModal from "./ReserveModal";

export default function FeaturedCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [reserveCar, setReserveCar] = useState<Car | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/cars?featured=true")
      .then((r) => r.json())
      .then(setCars)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-2">
              Handpicked for You
            </p>
            <h2 className="section-heading">Featured Inventory</h2>
            <p className="section-subheading text-base mt-2">
              Our most sought-after vehicles — each one inspected, documented, and
              ready to drive.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => scroll("left")}
              className="p-2.5 border border-ink/15 rounded-xl text-ink/60 hover:text-ink hover:border-ink/30 transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2.5 border border-ink/15 rounded-xl text-ink/60 hover:text-ink hover:border-ink/30 transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scroll container — horizontal on mobile, grid on md+ */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto hide-scrollbar pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0"
        >
          {loading
            ? [...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-auto bg-surface-2 border border-ink/6 rounded-2xl overflow-hidden animate-pulse"
                >
                  <div className="aspect-[16/10] bg-ink/5" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-ink/5 rounded w-3/4" />
                    <div className="h-3 bg-ink/5 rounded w-1/2" />
                    <div className="flex gap-2 mt-3">
                      <div className="h-6 bg-ink/5 rounded-full w-16" />
                      <div className="h-6 bg-ink/5 rounded-full w-16" />
                    </div>
                    <div className="h-5 bg-ink/5 rounded w-1/3 mt-2" />
                  </div>
                </div>
              ))
            : cars.map((car) => (
                <div
                  key={car.id}
                  className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-auto"
                >
                  <CarCard
                    car={car}
                    onView={setSelectedCar}
                    onReserve={setReserveCar}
                  />
                </div>
              ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/cars"
            className="inline-flex items-center gap-2 btn-red px-8 py-4 rounded-xl text-sm font-semibold group"
          >
            View All 15 Vehicles
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {selectedCar && (
        <CarModal car={selectedCar} onClose={() => setSelectedCar(null)} />
      )}
      {reserveCar && (
        <ReserveModal car={reserveCar} onClose={() => setReserveCar(null)} />
      )}
    </section>
  );
}
