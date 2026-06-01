import type { Metadata } from "next";
import Link from "next/link";
import {
  Globe,
  Car,
  Truck,
  FileText,
  DollarSign,
  Wrench,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Our Services | JMK Auto Premium",
  description:
    "JMK Auto offers complete automotive services — importation, sales, nationwide delivery, documentation, and financing assistance in Nigeria.",
};

const services = [
  {
    icon: Globe,
    title: "Vehicle Importation",
    desc: "Tell us your dream car and we'll source it globally. We import from the US, UK, Canada, Japan, and UAE — ensuring the highest quality at the best prices.",
    features: [
      "Global sourcing from 5+ countries",
      "Pre-purchase inspection overseas",
      "End-to-end shipping management",
      "Real-time shipment tracking",
      "Customs clearance handled",
    ],
    color: "from-blue-500/20 to-blue-500/5",
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-400",
  },
  {
    icon: Car,
    title: "Car Sales & Trading",
    desc: "Browse our curated inventory of 15+ premium vehicles in stock. We also accept trade-ins — drive in with your old car, leave in something premium.",
    features: [
      "15+ cars always in stock",
      "Trade-in valuations",
      "Test drive available",
      "Vehicle history reports",
      "Competitive pricing guaranteed",
    ],
    color: "from-gold/20 to-gold/5",
    iconBg: "bg-gold/15",
    iconColor: "text-gold",
  },
  {
    icon: Truck,
    title: "Nationwide Delivery",
    desc: "Your car, delivered safely to your door anywhere in Nigeria. We use insured, professional haulage services with GPS tracking.",
    features: [
      "Delivery to all 36 states",
      "Insured transportation",
      "GPS-tracked haulage",
      "Delivery within 3-5 business days",
      "Pre-delivery inspection included",
    ],
    color: "from-emerald-500/20 to-emerald-500/5",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
  },
  {
    icon: FileText,
    title: "Documentation & Clearance",
    desc: "Navigating Nigerian customs and vehicle registration has never been simpler. We handle every paper, every stamp, every approval.",
    features: [
      "Customs duty payment",
      "Bill of lading processing",
      "FRSC registration",
      "Insurance arrangement",
      "Engine number verification",
    ],
    color: "from-purple-500/20 to-purple-500/5",
    iconBg: "bg-purple-500/15",
    iconColor: "text-purple-400",
  },
  {
    icon: DollarSign,
    title: "Financing Assistance",
    desc: "We partner with leading Nigerian banks to help you access vehicle loans with competitive interest rates and flexible repayment terms.",
    features: [
      "Bank loan facilitation",
      "Flexible down payment options",
      "12–48 month repayment plans",
      "Quick approval processing",
      "No hidden finance charges",
    ],
    color: "from-rose-500/20 to-rose-500/5",
    iconBg: "bg-rose-500/15",
    iconColor: "text-rose-400",
  },
  {
    icon: Wrench,
    title: "After-Sale Support",
    desc: "We connect you with trusted, certified mechanics and service centres across Nigeria. Our 3-month post-purchase support keeps you on the road.",
    features: [
      "3-month after-sale warranty",
      "Trusted mechanic network",
      "Free first service check",
      "WhatsApp support line",
      "Spare parts sourcing",
    ],
    color: "from-orange-500/20 to-orange-500/5",
    iconBg: "bg-orange-500/15",
    iconColor: "text-orange-400",
  },
];

const steps = [
  { step: "01", title: "Tell Us What You Want", desc: "Browse our inventory or describe your dream car — make, model, year, budget, colour." },
  { step: "02", title: "We Source & Inspect", desc: "We find the best match globally, inspect it thoroughly, and send you photos and reports." },
  { step: "03", title: "Secure with a Deposit", desc: "Place a refundable deposit to hold the car while we finalise paperwork and shipping." },
  { step: "04", title: "We Handle Everything", desc: "Shipping, customs, registration, insurance — we manage it all, keeping you updated." },
  { step: "05", title: "Drive Your Dream Car", desc: "We deliver your fully documented car to your door. You just drive and enjoy!" },
];

const faqs = [
  {
    q: "How long does importation take?",
    a: "Typically 6–10 weeks from order to delivery, depending on the source country and shipping method. We'll give you a precise timeline when you order.",
  },
  {
    q: "Are your cars genuine and verified?",
    a: "Absolutely. Every car is independently inspected before purchase, and we provide full vehicle history reports, VIN verification, and customs documentation.",
  },
  {
    q: "Can I trade in my current car?",
    a: "Yes! We accept trade-ins. Bring your car for a valuation and we'll apply the trade-in value towards your new purchase.",
  },
  {
    q: "Do you offer financing?",
    a: "We work with multiple Nigerian banks to facilitate vehicle loans. Rates and eligibility depend on your bank and creditworthiness — we'll guide you through the process.",
  },
  {
    q: "What warranty do you offer?",
    a: "We provide a 3-month mechanical guarantee on all vehicles sold. We also connect you with extended warranty providers for additional peace of mind.",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-3/50 to-dark" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl">
              <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">
                Full-Service Dealership
              </p>
              <h1 className="text-5xl sm:text-6xl font-bold text-ink font-display leading-tight mb-6">
                Everything You Need,
                <span className="gold-text block">Under One Roof</span>
              </h1>
              <p className="text-silver-light text-xl leading-relaxed mb-8">
                From importation to your driveway, JMK Auto handles every step.
                We&apos;re not just a car dealership — we&apos;re your complete
                automotive partner.
              </p>
              <Link
                href="/contact"
                className="btn-red px-8 py-4 rounded-xl text-sm font-semibold inline-flex items-center gap-2 group"
              >
                Get Started Today
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <AnimatedSection key={s.title} delay={i * 70}>
                  <div
                    className={`relative bg-surface-2 rounded-2xl border border-ink/8 hover:border-ink/15 overflow-hidden group transition-all duration-400 h-full flex flex-col`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-100 transition-opacity duration-400`}
                    />
                    <div className="relative z-10 p-6 flex flex-col h-full">
                      <div
                        className={`w-12 h-12 rounded-xl ${s.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className={`w-6 h-6 ${s.iconColor}`} />
                      </div>
                      <h3 className="text-ink font-bold text-lg mb-3">
                        {s.title}
                      </h3>
                      <p className="text-silver text-sm leading-relaxed mb-5">
                        {s.desc}
                      </p>
                      <ul className="space-y-2 mt-auto">
                        {s.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-center gap-2.5 text-silver text-xs"
                          >
                            <CheckCircle2
                              className={`w-3.5 h-3.5 ${s.iconColor} flex-shrink-0`}
                            />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 sm:py-24 bg-surface-2/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">
                The Process
              </p>
              <h2 className="section-heading">How It Works</h2>
              <p className="section-subheading mx-auto text-center mt-4">
                Getting your premium car is easier than you think. Here&apos;s
                our simple 5-step process.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 relative">
            {/* Connector line */}
            <div className="absolute top-8 left-16 right-16 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent hidden lg:block" />

            {steps.map((s, i) => (
              <AnimatedSection key={s.step} delay={i * 80}>
                <div className="relative text-center flex flex-col items-center">
                  <div className="relative z-10 w-16 h-16 rounded-full bg-surface border-2 border-gold/50 flex items-center justify-center mb-4 group">
                    <span className="text-gold font-bold text-lg">{s.step}</span>
                  </div>
                  <h3 className="text-ink font-bold text-sm mb-2">{s.title}</h3>
                  <p className="text-silver text-xs leading-relaxed">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">
                Got Questions?
              </p>
              <h2 className="section-heading">Frequently Asked Questions</h2>
            </div>
          </AnimatedSection>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 60}>
                <details className="group bg-surface-2 rounded-2xl border border-ink/8 hover:border-ink/15 transition-colors overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none gap-4">
                    <span className="text-ink font-semibold text-sm">{faq.q}</span>
                    <ChevronDown className="w-4 h-4 text-silver flex-shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-silver text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={300}>
            <div className="mt-10 text-center">
              <p className="text-silver text-sm mb-4">
                Still have questions? We&apos;d love to help.
              </p>
              <Link
                href="/contact"
                className="btn-red px-8 py-3.5 rounded-xl text-sm font-semibold inline-flex items-center gap-2"
              >
                Contact Our Team
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
