"use client";

import { RotateCcw } from "lucide-react";
import { Filters, defaultFilters } from "@/types";
import { makes, bodyTypes, fuelTypes, conditions, years } from "@/data/cars";

interface Props {
  filters: Filters;
  onChange: (filters: Filters) => void;
  totalResults: number;
  loading?: boolean;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-ink/8 pb-5">
      <h4 className="text-ink font-semibold text-xs uppercase tracking-widest mb-4">
        {title}
      </h4>
      {children}
    </div>
  );
}

function CheckOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group py-1">
      <div
        className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
          checked
            ? "bg-gold border-gold"
            : "border-ink/20 group-hover:border-gold/50"
        }`}
      >
        {checked && (
          <svg className="w-2.5 h-2.5" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="#0F172A"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <span
        className={`text-sm transition-colors ${
          checked ? "text-gold" : "text-silver group-hover:text-ink"
        }`}
      >
        {label}
      </span>
    </label>
  );
}

function toggleArray<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
}

export default function CarFilters({ filters, onChange, totalResults, loading }: Props) {
  const set = (partial: Partial<Filters>) => onChange({ ...filters, ...partial });

  if (loading) {
    return (
      <div className="bg-surface-2 rounded-2xl border border-ink/8 p-5 space-y-5 animate-pulse">
        {/* Header skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="h-5 bg-ink/5 rounded w-20 mb-2" />
            <div className="h-3 bg-ink/5 rounded w-32" />
          </div>
          <div className="h-5 bg-ink/5 rounded w-12" />
        </div>

        {/* Filter sections skeleton */}
        {[...Array(7)].map((_, i) => (
          <div key={i} className="border-b border-ink/8 pb-5">
            <div className="h-3 bg-ink/5 rounded w-24 mb-4" />
            <div className="space-y-2">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="h-4 bg-ink/5 rounded w-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-surface-2 rounded-2xl border border-ink/8 p-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-ink font-bold">Filters</h3>
          <p className="text-silver text-xs mt-0.5">{totalResults} vehicles found</p>
        </div>
        <button
          onClick={() => onChange(defaultFilters)}
          className="flex items-center gap-1.5 text-silver hover:text-gold text-xs transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Price Range */}
      <Section title="Price Range">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-silver/70 text-[10px] uppercase tracking-wider block mb-1">
              Min (₦M)
            </label>
            <input
              type="number"
              placeholder="0"
              value={filters.minPrice !== "" ? Number(filters.minPrice) / 1000000 : ""}
              onChange={(e) =>
                set({ minPrice: e.target.value ? Number(e.target.value) * 1000000 : "" })
              }
              className="w-full bg-ink/5 border border-ink/10 rounded-lg px-3 py-2 text-ink text-sm focus:outline-none focus:border-gold transition-colors placeholder-ink/30"
            />
          </div>
          <div>
            <label className="text-silver/70 text-[10px] uppercase tracking-wider block mb-1">
              Max (₦M)
            </label>
            <input
              type="number"
              placeholder="Any"
              value={filters.maxPrice !== "" ? Number(filters.maxPrice) / 1000000 : ""}
              onChange={(e) =>
                set({ maxPrice: e.target.value ? Number(e.target.value) * 1000000 : "" })
              }
              className="w-full bg-ink/5 border border-ink/10 rounded-lg px-3 py-2 text-ink text-sm focus:outline-none focus:border-gold transition-colors placeholder-ink/30"
            />
          </div>
        </div>
      </Section>

      {/* Make */}
      <Section title="Make / Brand">
        <div className="space-y-0.5">
          {makes.map((m) => (
            <CheckOption
              key={m}
              label={m}
              checked={filters.makes.includes(m)}
              onChange={() => set({ makes: toggleArray(filters.makes, m) })}
            />
          ))}
        </div>
      </Section>

      {/* Year */}
      <Section title="Year">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-silver/70 text-[10px] uppercase tracking-wider block mb-1">
              From
            </label>
            <select
              value={filters.minYear}
              onChange={(e) =>
                set({ minYear: e.target.value ? Number(e.target.value) : "" })
              }
              className="w-full bg-ink/5 border border-ink/10 rounded-lg px-3 py-2 text-ink text-sm focus:outline-none focus:border-gold appearance-none"
            >
              <option value="" className="bg-surface-2">
                Any
              </option>
              {years.map((y) => (
                <option key={y} value={y} className="bg-surface-2">
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-silver/70 text-[10px] uppercase tracking-wider block mb-1">
              To
            </label>
            <select
              value={filters.maxYear}
              onChange={(e) =>
                set({ maxYear: e.target.value ? Number(e.target.value) : "" })
              }
              className="w-full bg-ink/5 border border-ink/10 rounded-lg px-3 py-2 text-ink text-sm focus:outline-none focus:border-gold appearance-none"
            >
              <option value="" className="bg-surface-2">
                Any
              </option>
              {years.map((y) => (
                <option key={y} value={y} className="bg-surface-2">
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Section>

      {/* Fuel Type */}
      <Section title="Fuel Type">
        <div className="space-y-0.5">
          {fuelTypes.map((f) => (
            <CheckOption
              key={f}
              label={f}
              checked={filters.fuelTypes.includes(f)}
              onChange={() => set({ fuelTypes: toggleArray(filters.fuelTypes, f) })}
            />
          ))}
        </div>
      </Section>

      {/* Transmission */}
      <Section title="Transmission">
        {(["Automatic", "Manual"] as const).map((t) => (
          <CheckOption
            key={t}
            label={t}
            checked={filters.transmissions.includes(t)}
            onChange={() =>
              set({ transmissions: toggleArray(filters.transmissions, t) })
            }
          />
        ))}
      </Section>

      {/* Body Type */}
      <Section title="Body Type">
        <div className="space-y-0.5">
          {bodyTypes.map((b) => (
            <CheckOption
              key={b}
              label={b}
              checked={filters.bodyTypes.includes(b)}
              onChange={() =>
                set({ bodyTypes: toggleArray(filters.bodyTypes, b) })
              }
            />
          ))}
        </div>
      </Section>

      {/* Condition */}
      <Section title="Condition">
        <div className="space-y-0.5">
          {conditions.map((c) => (
            <CheckOption
              key={c}
              label={c}
              checked={filters.conditions.includes(c)}
              onChange={() =>
                set({ conditions: toggleArray(filters.conditions, c) })
              }
            />
          ))}
        </div>
      </Section>

      {/* Max Mileage */}
      <div>
        <h4 className="text-ink font-semibold text-xs uppercase tracking-widest mb-4">
          Max Mileage
        </h4>
        <div>
          <input
            type="number"
            placeholder="e.g. 60000"
            value={filters.maxMileage}
            onChange={(e) =>
              set({ maxMileage: e.target.value ? Number(e.target.value) : "" })
            }
            className="w-full bg-ink/5 border border-ink/10 rounded-lg px-3 py-2 text-ink text-sm focus:outline-none focus:border-gold transition-colors placeholder-ink/30"
          />
          <p className="text-silver/50 text-[10px] mt-1">Kilometres</p>
        </div>
      </div>
    </div>
  );
}
