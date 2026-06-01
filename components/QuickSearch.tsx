"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";

const makeOptions = [
  "All Makes",
  "Toyota",
  "Lexus",
  "Mercedes-Benz",
  "BMW",
  "Range Rover",
  "Honda",
  "Ford",
];

const priceOptions = [
  { label: "Any Price", value: "" },
  { label: "Under ₦25M", value: "0-25000000" },
  { label: "₦25M – ₦40M", value: "25000000-40000000" },
  { label: "₦40M – ₦60M", value: "40000000-60000000" },
  { label: "₦60M – ₦80M", value: "60000000-80000000" },
  { label: "₦80M+", value: "80000000-999999999" },
];

const yearOptions = [
  "Any Year",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018 & Older",
];

interface SelectProps {
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[] | string[];
  placeholder: string;
}

function Select({ value, onChange, options, placeholder }: SelectProps) {
  const normalized = options.map((o) =>
    typeof o === "string" ? { label: o, value: o } : o
  );
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-transparent text-ink pl-4 pr-10 py-4 focus:outline-none text-sm cursor-pointer"
      >
        {normalized.map((o) => (
          <option key={o.value} value={o.value} className="bg-surface-2 text-ink">
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/60 pointer-events-none" />
    </div>
  );
}

export default function QuickSearch() {
  const [make, setMake] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (make && make !== "All Makes") params.set("make", make);
    if (price) params.set("price", price);
    if (year && year !== "Any Year") {
      if (year === "2018 & Older") {
        params.set("year", "2018");
      } else {
        params.set("year", year);
      }
    }
    router.push(`/cars?${params.toString()}`);
  };

  return (
    <div className="relative z-10 mt-6 sm:-mt-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="glass rounded-2xl p-2 shadow-2xl border border-ink/10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
            {/* Make */}
            <div className="border-b sm:border-b-0 sm:border-r border-ink/10">
              <div className="px-4 pt-3 pb-1">
                <p className="text-gold text-xs font-semibold uppercase tracking-widest">
                  Make / Brand
                </p>
              </div>
              <Select
                value={make}
                onChange={setMake}
                options={makeOptions}
                placeholder="Any Make"
              />
            </div>

            {/* Price */}
            <div className="border-b sm:border-b-0 sm:border-r border-ink/10">
              <div className="px-4 pt-3 pb-1">
                <p className="text-gold text-xs font-semibold uppercase tracking-widest">
                  Price Range
                </p>
              </div>
              <Select
                value={price}
                onChange={setPrice}
                options={priceOptions}
                placeholder="Any Price"
              />
            </div>

            {/* Year */}
            <div className="flex items-stretch gap-0">
              <div className="flex-1">
                <div className="px-4 pt-3 pb-1">
                  <p className="text-gold text-xs font-semibold uppercase tracking-widest">
                    Year
                  </p>
                </div>
                <Select
                  value={year}
                  onChange={setYear}
                  options={yearOptions}
                  placeholder="Any Year"
                />
              </div>
              <div className="flex items-center px-3">
                <button
                  onClick={handleSearch}
                  className="btn-red h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 hover:scale-105 active:scale-95 transition-transform"
                  aria-label="Search cars"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
