import AnimatedSection from "./AnimatedSection";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Chukwuemeka Okafor",
    role: "Business Executive, Lagos",
    initials: "CO",
    rating: 5,
    text: "JMK Auto exceeded every expectation. I bought a 2021 Lexus RX 350 and the entire process — from selection to delivery — was seamless. The car is exactly as described. Absolutely recommend!",
    car: "2021 Lexus RX 350",
    color: "from-gold/30 to-gold/10",
  },
  {
    name: "Adaeze Nwosu",
    role: "Medical Doctor, Abuja",
    initials: "AN",
    rating: 5,
    text: "I was initially nervous about buying a foreign-used car, but JMK Auto put all my fears to rest. The documentation was handled perfectly and my BMW X5 arrived in perfect condition. 10/10!",
    car: "2020 BMW X5",
    color: "from-blue-500/30 to-blue-500/10",
  },
  {
    name: "Ibrahim Suleiman",
    role: "Entrepreneur, Kano",
    initials: "IS",
    rating: 5,
    text: "Bought a Toyota Land Cruiser V8 from JMK. The price was the best I found in Nigeria and they even delivered it to Kano. The team is professional, honest, and responsive. Highly recommend.",
    car: "2020 Toyota Land Cruiser",
    color: "from-emerald-500/30 to-emerald-500/10",
  },
  {
    name: "Folake Adeleke",
    role: "Lawyer, Port Harcourt",
    initials: "FA",
    rating: 5,
    text: "JMK Auto handled everything including the registration paperwork. I'm driving my dream Mercedes-Benz E350 today because of them. Professional service from start to finish!",
    car: "2019 Mercedes E350",
    color: "from-purple-500/30 to-purple-500/10",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < count ? "text-gold fill-gold" : "text-ink/20"
          }`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-24 bg-surface-2/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-14">
            <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">
              Real Stories
            </p>
            <h2 className="section-heading">
              What Our Customers Say
            </h2>
            <p className="section-subheading mx-auto text-center mt-4 text-base">
              Over 500 happy customers across Nigeria. Don&apos;t just take our word for it.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 90}>
              <div className="relative bg-surface-2 rounded-2xl p-6 border border-ink/10 hover:border-ink/20 transition-all duration-300 group h-full flex flex-col">
                {/* Gradient on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${t.color} opacity-0 group-hover:opacity-100 transition-opacity duration-400`}
                />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Quote icon */}
                  <Quote className="w-8 h-8 text-gold/30 mb-4 flex-shrink-0" />

                  {/* Stars */}
                  <Stars count={t.rating} />

                  {/* Text */}
                  <p className="text-silver text-sm leading-relaxed mt-4 flex-1">
                    &ldquo;{t.text}&rdquo;
                  </p>

                  {/* Car badge */}
                  <div className="mt-4 mb-5">
                    <span className="text-[10px] text-gold/80 bg-gold/10 border border-gold/20 px-2.5 py-1 rounded-full">
                      Purchased: {t.car}
                    </span>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-ink/10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/40 to-gold/10 flex items-center justify-center text-ink font-bold text-sm flex-shrink-0">
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-ink font-semibold text-sm">{t.name}</p>
                      <p className="text-silver/70 text-xs">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Overall rating */}
        <AnimatedSection>
          <div className="mt-14 text-center">
            <div className="inline-flex items-center gap-4 px-8 py-4 glass rounded-2xl border border-gold/15">
              <div className="text-center">
                <p className="text-4xl font-bold text-gold">4.9</p>
                <Stars count={5} />
                <p className="text-silver text-xs mt-1">Average Rating</p>
              </div>
              <div className="w-px h-12 bg-ink/10" />
              <div className="text-center">
                <p className="text-4xl font-bold text-ink">500+</p>
                <p className="text-silver text-xs mt-1">Happy Customers</p>
              </div>
              <div className="w-px h-12 bg-ink/10 hidden sm:block" />
              <div className="text-center hidden sm:block">
                <p className="text-4xl font-bold text-ink">10+</p>
                <p className="text-silver text-xs mt-1">Years in Business</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
