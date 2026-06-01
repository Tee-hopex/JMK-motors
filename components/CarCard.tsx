"use client";

import Image from "next/image";
import { Fuel, Gauge, Settings2, Calendar } from "lucide-react";
import { Car } from "@/types";
import { formatNaira } from "@/utils/format";

interface Props {
  car: Car;
  onView: (car: Car) => void;
  onReserve: (car: Car) => void;
}

export default function CarCard({ car, onView, onReserve }: Props) {
  const conditionColor =
    car.condition === "Brand New"
      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      : car.condition === "Foreign Used"
      ? "bg-gold/20 text-gold border-gold/30"
      : "bg-blue-500/20 text-blue-400 border-blue-500/30";

  return (
    <div className="car-card bg-surface-2 rounded-2xl overflow-hidden group border border-ink/8 hover:border-gold/20 flex flex-col">
      {/* Image */}
      <div
        className="relative h-52 sm:h-56 overflow-hidden cursor-pointer"
        onClick={() => onView(car)}
      >
        <Image
          src={car.images[0]}
          alt={`${car.year} ${car.make} ${car.model}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={80}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Hover CTA */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="px-5 py-2 glass text-ink text-sm font-semibold rounded-full border border-ink/20">
            View Details
          </span>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <span
            className={`px-2.5 py-1 text-[11px] font-bold rounded-full border ${conditionColor}`}
          >
            {car.condition}
          </span>
          <span className="px-2.5 py-1 bg-black/50 backdrop-blur-sm text-white text-[11px] rounded-full border border-white/20">
            {car.bodyType}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="min-w-0">
            <h3 className="text-ink font-bold text-base leading-snug truncate">
              {car.year} {car.make}
            </h3>
            <p className="text-silver text-sm truncate">{car.model}</p>
          </div>
          <p className="text-gold font-bold text-lg leading-snug flex-shrink-0">
            {formatNaira(car.price)}
          </p>
        </div>

        {/* Specs row */}
        <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-3 mb-4">
          <span className="flex items-center gap-1 text-silver text-xs">
            <Calendar className="w-3 h-3 text-gold/70" />
            {car.year}
          </span>
          <span className="text-ink/20 text-xs">•</span>
          <span className="flex items-center gap-1 text-silver text-xs">
            <Gauge className="w-3 h-3 text-gold/70" />
            {car.mileage.toLocaleString()} km
          </span>
          <span className="text-ink/20 text-xs">•</span>
          <span className="flex items-center gap-1 text-silver text-xs">
            <Fuel className="w-3 h-3 text-gold/70" />
            {car.fuelType}
          </span>
          <span className="text-ink/20 text-xs">•</span>
          <span className="flex items-center gap-1 text-silver text-xs">
            <Settings2 className="w-3 h-3 text-gold/70" />
            {car.transmission === "Automatic" ? "Auto" : "Manual"}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => onView(car)}
            className="flex-1 py-2.5 border border-ink/15 text-ink text-sm rounded-xl hover:bg-ink/5 hover:border-ink/30 transition-all duration-200 font-medium"
          >
            View Details
          </button>
          <button
            onClick={() => onReserve(car)}
            className="flex-1 py-2.5 btn-red text-sm rounded-xl font-medium"
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
}
