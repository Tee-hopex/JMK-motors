import AnimatedSection from "./AnimatedSection";
import {
  ShieldCheck,
  Truck,
  BadgeDollarSign,
  FileText,
  HeartHandshake,
} from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Quality Guaranteed",
    desc: "Every vehicle undergoes a rigorous 120-point inspection by certified mechanics before listing. We sell only what we trust.",
    color: "from-emerald-500/20 to-emerald-500/5",
    iconColor: "text-emerald-400",
  },
  {
    icon: BadgeDollarSign,
    title: "Best Market Prices",
    desc: "We import directly with no middlemen, giving you Nigeria's most competitive prices on premium foreign-used vehicles.",
    color: "from-gold/20 to-gold/5",
    iconColor: "text-gold",
  },
  {
    icon: FileText,
    title: "Full Documentation",
    desc: "We handle all customs clearance, NAFDAC, and vehicle registration paperwork — completely stress-free for you.",
    color: "from-blue-500/20 to-blue-500/5",
    iconColor: "text-blue-400",
  },
  {
    icon: Truck,
    title: "Nationwide Delivery",
    desc: "Wherever you are in Nigeria — Lagos, Abuja, Port Harcourt, Kano — we deliver your car safely to your doorstep.",
    color: "from-purple-500/20 to-purple-500/5",
    iconColor: "text-purple-400",
  },
  {
    icon: HeartHandshake,
    title: "After-Sale Support",
    desc: "Our relationship doesn't end at the sale. We provide 3-month post-purchase support and connect you with trusted service centres.",
    color: "from-rose-500/20 to-rose-500/5",
    iconColor: "text-rose-400",
  },
];

export default function WhyChooseJMK() {
  return (
    <section className="py-20 sm:py-24 relative overflow-hidden">
      {/* Background decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-14">
            <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">
              Why JMK Auto
            </p>
            <h2 className="section-heading">
              Nigeria&apos;s Most Trusted
              <span className="gold-text block mt-1">Car Dealership</span>
            </h2>
            <p className="section-subheading mx-auto text-center mt-4 text-base">
              We&apos;ve built our reputation one satisfied customer at a time. Here&apos;s what
              makes JMK Auto different.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <AnimatedSection key={r.title} delay={i * 80}>
                <div
                  className={`relative p-6 rounded-2xl border border-ink/10 bg-surface-2 hover:border-ink/20 transition-all duration-400 group h-full flex flex-col`}
                >
                  {/* Gradient bg on hover */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${r.color} opacity-0 group-hover:opacity-100 transition-opacity duration-400`}
                  />
                  <div className="relative z-10 flex flex-col gap-4 h-full">
                    <div
                      className={`w-12 h-12 rounded-xl bg-ink/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`w-6 h-6 ${r.iconColor}`} />
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      <h3 className="text-ink font-bold text-base leading-snug">
                        {r.title}
                      </h3>
                      <p className="text-silver text-sm leading-relaxed">
                        {r.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
