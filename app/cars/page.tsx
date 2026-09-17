"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { SlidersHorizontal, X, Search, ChevronDown } from "lucide-react";
import { Car, Filters, defaultFilters } from "@/types";
import CarCard from "@/components/CarCard";
import CarModal from "@/components/CarModal";
import ReserveModal from "@/components/ReserveModal";
import CarFilters from "@/components/CarFilters";

type SortKey = "featured" | "price-asc" | "price-desc" | "year-desc" | "mileage-asc";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "year-desc", label: "Newest First" },
  { value: "mileage-asc", label: "Lowest Mileage" },
];

export default function CarsPage() {
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [sortBy, setSortBy] = useState<SortKey>("featured");
  const [search, setSearch] = useState("");
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [reserveCar, setReserveCar] = useState<Car | null>(null);
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  useEffect(() => {
    fetch("/api/cars")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setAllCars(Array.isArray(data) ? data : []))
      .catch(() => setAllCars([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let result = allCars.filter((car) => {
      if (filters.makes.length && !filters.makes.includes(car.make)) return false;
      if (filters.minPrice !== "" && car.price < Number(filters.minPrice)) return false;
      if (filters.maxPrice !== "" && car.price > Number(filters.maxPrice)) return false;
      if (filters.minYear !== "" && car.year < Number(filters.minYear)) return false;
      if (filters.maxYear !== "" && car.year > Number(filters.maxYear)) return false;
      if (filters.fuelTypes.length && !filters.fuelTypes.includes(car.fuelType)) return false;
      if (filters.transmissions.length && !filters.transmissions.includes(car.transmission)) return false;
      if (filters.bodyTypes.length && !filters.bodyTypes.includes(car.bodyType)) return false;
      if (filters.conditions.length && !filters.conditions.includes(car.condition)) return false;
      if (filters.maxMileage !== "" && car.mileage > Number(filters.maxMileage)) return false;
      if (search) {
        const q = search.toLowerCase();
        const match =
          car.make.toLowerCase().includes(q) ||
          car.model.toLowerCase().includes(q) ||
          car.bodyType.toLowerCase().includes(q) ||
          car.color.toLowerCase().includes(q) ||
          String(car.year).includes(q);
        if (!match) return false;
      }
      return true;
    });

    result.sort((a, b) => {
      switch (sortBy) {
        case "price-asc": return a.price - b.price;
        case "price-desc": return b.price - a.price;
        case "year-desc": return b.year - a.year;
        case "mileage-asc": return a.mileage - b.mileage;
        default: return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });

    return result;
  }, [allCars, filters, sortBy, search]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.makes.length) count++;
    if (filters.minPrice !== "") count++;
    if (filters.maxPrice !== "") count++;
    if (filters.minYear !== "") count++;
    if (filters.maxYear !== "") count++;
    if (filters.fuelTypes.length) count++;
    if (filters.transmissions.length) count++;
    if (filters.bodyTypes.length) count++;
    if (filters.conditions.length) count++;
    if (filters.maxMileage !== "") count++;
    return count;
  }, [filters]);

  const handleView = useCallback((car: Car) => setSelectedCar(car), []);
  const handleReserve = useCallback((car: Car) => setReserveCar(car), []);

  return (
    <div className="min-h-screen pt-20">
      {/* Page Header */}
      <div className="bg-surface-2 border-b border-ink/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-2">
            Our Inventory
          </p>
          <h1 className="text-4xl font-bold text-ink font-display">
            Browse All Vehicles
          </h1>
          <p className="text-silver mt-2">
            {loading ? "Loading inventory…" : `${allCars.length} premium imported cars available — filters update results instantly.`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-silver/50" />
            <input
              type="text"
              placeholder="Search by make, model, year, color..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-surface-2 border border-ink/10 rounded-xl text-ink placeholder-ink/40 focus:outline-none focus:border-gold transition-colors text-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-silver hover:text-ink"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="appearance-none bg-surface-2 border border-ink/10 rounded-xl px-4 py-3 pr-10 text-ink text-sm focus:outline-none focus:border-gold cursor-pointer"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value} className="bg-surface-2">
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-silver pointer-events-none" />
          </div>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowFiltersPanel(!showFiltersPanel)}
            className="lg:hidden flex items-center gap-2 px-4 py-3 bg-surface-2 border border-ink/10 rounded-xl text-ink text-sm hover:border-ink/25 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="px-1.5 py-0.5 bg-gold text-dark text-xs rounded-full font-bold leading-none">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters — desktop always visible */}
          <div className="hidden lg:block w-60 flex-shrink-0">
            <div className="sticky top-24">
              <CarFilters
                filters={filters}
                onChange={setFilters}
                totalResults={filtered.length}
                loading={loading}
              />
            </div>
          </div>

          {/* Mobile Filters Panel */}
          {showFiltersPanel && (
            <div className="lg:hidden fixed inset-0 z-40">
              <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={() => setShowFiltersPanel(false)}
              />
              <div className="absolute inset-y-0 right-0 w-80 max-w-full bg-surface overflow-y-auto p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-ink font-bold">Filter Cars</h3>
                  <button
                    onClick={() => setShowFiltersPanel(false)}
                    className="p-2 hover:bg-white/10 rounded-xl text-silver"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <CarFilters
                  filters={filters}
                  onChange={setFilters}
                  totalResults={filtered.length}
                  loading={loading}
                />
                <button
                  onClick={() => setShowFiltersPanel(false)}
                  className="mt-6 w-full btn-red py-3.5 rounded-xl font-semibold text-sm"
                >
                  Show {filtered.length} Results
                </button>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="flex-1 min-w-0">
            {/* Results info */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-silver text-sm">
                {loading ? (
                  <span className="text-ink/40">Loading vehicles…</span>
                ) : (
                  <>
                    <span className="text-ink font-semibold">{filtered.length}</span>{" "}
                    vehicle{filtered.length !== 1 ? "s" : ""} found
                    {activeFilterCount > 0 && (
                      <button
                        onClick={() => setFilters(defaultFilters)}
                        className="ml-3 text-gold hover:underline text-xs"
                      >
                        Clear all filters
                      </button>
                    )}
                  </>
                )}
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-surface-2 border border-ink/6 rounded-2xl overflow-hidden animate-pulse">
                    <div className="aspect-[16/10] bg-ink/5" />
                    <div className="p-5 space-y-3">
                      <div className="h-4 bg-ink/5 rounded w-3/4" />
                      <div className="h-3 bg-ink/5 rounded w-1/2" />
                      <div className="flex gap-2 mt-3">
                        <div className="h-6 bg-ink/5 rounded-full w-16" />
                        <div className="h-6 bg-ink/5 rounded-full w-16" />
                        <div className="h-6 bg-ink/5 rounded-full w-16" />
                      </div>
                      <div className="h-5 bg-ink/5 rounded w-1/3 mt-2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 rounded-full bg-surface-2 flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-silver/40" />
                </div>
                <h3 className="text-ink font-bold text-xl mb-2">
                  No vehicles found
                </h3>
                <p className="text-silver text-sm mb-6 max-w-sm">
                  No cars match your current filters. Try adjusting or clearing
                  your filters to see more results.
                </p>
                <button
                  onClick={() => {
                    setFilters(defaultFilters);
                    setSearch("");
                  }}
                  className="btn-red px-6 py-3 rounded-xl text-sm font-semibold"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    onView={handleView}
                    onReserve={handleReserve}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedCar && (
        <CarModal car={selectedCar} onClose={() => setSelectedCar(null)} />
      )}
      {reserveCar && (
        <ReserveModal car={reserveCar} onClose={() => setReserveCar(null)} />
      )}
    </div>
  );
}
