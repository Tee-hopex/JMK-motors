"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Fuel,
  Gauge,
  Calendar,
  Settings2,
  Users,
  Compass,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { Car } from "@/types";
import { formatNaira } from "@/utils/format";
import ReserveModal from "./ReserveModal";

interface Props {
  car: Car;
  onClose: () => void;
}

export default function CarModal({ car, onClose }: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const [showReserve, setShowReserve] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const conditionColor =
    car.condition === "Brand New"
      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
      : "text-gold bg-gold/10 border-gold/20";

  const specs = [
    { icon: Calendar, label: "Year", value: car.year.toString() },
    { icon: Gauge, label: "Mileage", value: `${car.mileage.toLocaleString()} km` },
    { icon: Fuel, label: "Fuel Type", value: car.fuelType },
    { icon: Settings2, label: "Transmission", value: car.transmission },
    { icon: Users, label: "Seating", value: `${car.seats} Seats` },
    { icon: Compass, label: "Drivetrain", value: car.drivetrain },
    { icon: Zap, label: "Engine", value: car.engine },
    { icon: CheckCircle2, label: "Condition", value: car.condition },
  ];

  const waMessage = encodeURIComponent(
    `Hello JMK Auto! I'm interested in the ${car.year} ${car.make} ${car.model} priced at ${formatNaira(car.price)}. Please can you give me more details?`
  );

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-ink/75 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative z-10 min-h-screen flex items-start sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-surface-2 w-full sm:rounded-2xl max-w-5xl shadow-2xl border border-ink/10 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-ink/8">
              <div className="min-w-0">
                <h2 className="text-xl font-bold text-ink truncate">
                  {car.year} {car.make} {car.model}
                </h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-gold font-bold text-lg">
                    {formatNaira(car.price)}
                  </span>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${conditionColor}`}
                  >
                    {car.condition}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2.5 hover:bg-ink/10 rounded-xl transition-colors text-ink/60 hover:text-ink flex-shrink-0 ml-4"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left: Images */}
              <div className="relative">
                <div className="relative h-64 sm:h-80 lg:h-full min-h-[280px]">
                  <Image
                    src={car.images[activeImage]}
                    alt={`${car.make} ${car.model}`}
                    fill
                    className="object-cover"
                    quality={85}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* Arrows for multi-image */}
                  {car.images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setActiveImage(
                            (p) => (p - 1 + car.images.length) % car.images.length
                          )
                        }
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 glass rounded-full"
                      >
                        <ChevronLeft className="w-4 h-4 text-ink" />
                      </button>
                      <button
                        onClick={() =>
                          setActiveImage((p) => (p + 1) % car.images.length)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 glass rounded-full"
                      >
                        <ChevronRight className="w-4 h-4 text-ink" />
                      </button>
                    </>
                  )}

                  {/* Color badge */}
                  <div className="absolute bottom-4 left-4 px-3 py-1 glass rounded-full text-xs text-silver">
                    {car.color}
                  </div>
                </div>

                {/* Thumbnails */}
                {car.images.length > 1 && (
                  <div className="flex gap-2 p-4">
                    {car.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          idx === activeImage
                            ? "border-gold scale-105"
                            : "border-ink/15 hover:border-ink/30"
                        }`}
                      >
                        <Image src={img} alt="" fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Details */}
              <div className="overflow-y-auto max-h-[70vh] lg:max-h-[80vh]">
                <div className="p-5 space-y-5">
                  {/* Specs Grid */}
                  <div>
                    <h3 className="text-ink font-semibold text-sm uppercase tracking-wider mb-3">
                      Specifications
                    </h3>
                    <div className="grid grid-cols-2 gap-2.5">
                      {specs.map(({ icon: Icon, label, value }) => (
                        <div
                          key={label}
                          className="flex items-center gap-3 p-3 bg-ink/4 hover:bg-ink/6 rounded-xl transition-colors"
                        >
                          <div className="p-1.5 bg-gold/15 rounded-lg flex-shrink-0">
                            <Icon className="w-3.5 h-3.5 text-gold" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-silver/70 text-[10px] uppercase tracking-wider">
                              {label}
                            </p>
                            <p className="text-ink text-xs font-semibold mt-0.5 truncate">
                              {value}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-ink font-semibold text-sm uppercase tracking-wider mb-2">
                      About This Car
                    </h3>
                    <p className="text-silver text-sm leading-relaxed">
                      {car.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-ink font-semibold text-sm uppercase tracking-wider mb-3">
                      Features & Equipment
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {car.features.map((f) => (
                        <span
                          key={f}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-ink/5 border border-ink/10 rounded-full text-ink/70 text-xs hover:border-gold/30 hover:text-gold/80 transition-colors"
                        >
                          <CheckCircle2 className="w-3 h-3 text-gold/60" />
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setShowReserve(true)}
                      className="flex-1 btn-red py-3.5 rounded-xl text-sm font-semibold"
                    >
                      Reserve This Car
                    </button>
                    <a
                      href={`https://wa.me/2348012345678?text=${waMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-3.5 bg-emerald-600 hover:bg-emerald-700 rounded-xl text-white text-sm font-semibold transition-colors"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showReserve && (
        <ReserveModal car={car} onClose={() => setShowReserve(false)} />
      )}
    </>
  );
}
