import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Users,
  TrendingUp,
  Globe,
  Award,
  ArrowRight,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "About Us | JMK Auto Premium",
  description:
    "Learn the JMK Auto story. Nigeria's most trusted premium car dealership with over 10 years of experience importing and selling luxury vehicles.",
};

const values = [
  {
    icon: Shield,
    title: "Integrity First",
    desc: "We never compromise on honesty. Every car description, every price, every document — 100% transparent.",
  },
  {
    icon: Award,
    title: "Quality Obsession",
    desc: "Our 120-point inspection process ensures only the best vehicles make it into our showroom.",
  },
  {
    icon: Users,
    title: "Customer Centricity",
    desc: "Your satisfaction drives everything we do. We're not done until you're driving happy.",
  },
  {
    icon: Globe,
    title: "Global Sourcing",
    desc: "We source from the US, UK, Canada, Japan, and UAE — giving you the widest selection at the best prices.",
  },
];

const team = [
  {
    name: "Jide Makinde",
    role: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    bio: "15 years in automotive import with a passion for connecting Nigerians with the best vehicles.",
  },
  {
    name: "Kemi Oladipo",
    role: "Head of Operations",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80",
    bio: "Former logistics expert who ensures every car arrives safely and every document is perfect.",
  },
  {
    name: "Mike Eze",
    role: "Lead Vehicle Inspector",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    bio: "Certified mechanic with 12 years experience. He's the reason every JMK car passes our 120-point check.",
  },
];

const milestones = [
  { year: "2014", event: "JMK Auto founded in Lagos with 5 cars" },
  { year: "2016", event: "Expanded to Abuja showroom; 100 cars sold" },
  { year: "2018", event: "Introduced nationwide delivery service" },
  { year: "2020", event: "500+ satisfied customers milestone reached" },
  { year: "2022", event: "Launched online inventory & digital reservations" },
  { year: "2024", event: "Recognised as Top 10 Dealership in Nigeria" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1920&q=80"
            alt="About JMK Auto"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/95" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl">
              <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">
                Our Story
              </p>
              <h1 className="text-5xl sm:text-6xl font-bold text-white font-display leading-tight mb-6">
                Built on Trust,
                <span className="gold-text block">Driven by Quality</span>
              </h1>
              <p className="text-silver-light text-xl leading-relaxed">
                JMK Auto was born from a simple mission: to give every Nigerian
                access to premium, verified imported vehicles at fair prices —
                with zero stress and full transparency.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-surface-2 border-y border-ink/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: "500+", label: "Cars Sold" },
              { value: "10+", label: "Years Experience" },
              { value: "4.9★", label: "Customer Rating" },
              { value: "36", label: "States We Deliver To" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-4xl font-bold text-gold">{value}</p>
                <p className="text-silver text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <AnimatedSection>
              <div className="relative rounded-2xl overflow-hidden h-80 sm:h-96">
                <Image
                  src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=900&q=80"
                  alt="Our Showroom"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 px-4 py-2 glass rounded-xl">
                  <p className="text-ink text-sm font-semibold">Our Lekki Showroom</p>
                  <p className="text-silver text-xs">Lagos, Nigeria</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={150}>
              <div>
                <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">
                  Who We Are
                </p>
                <h2 className="section-heading mb-5">
                  More Than a Dealership
                </h2>
                <div className="space-y-4 text-silver leading-relaxed">
                  <p>
                    Founded in 2014 by Jide Makinde, JMK Auto started as a
                    one-man import operation with a dream: to bring
                    international-grade car buying to Nigeria. Today, we&apos;re
                    a team of 20+ professionals serving customers across all 36
                    states.
                  </p>
                  <p>
                    We source our vehicles directly from auction houses and
                    dealers in the United States, United Kingdom, Canada, Japan,
                    and UAE. Every car is personally inspected by our team
                    overseas before shipment.
                  </p>
                  <p>
                    At JMK Auto, we don&apos;t just sell cars — we deliver
                    peace of mind. From the first inquiry to the moment you
                    drive off, we&apos;re with you every step of the way.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-2 btn-red px-7 py-3.5 rounded-xl text-sm font-semibold group"
                >
                  Get in Touch
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-24 bg-surface-2/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">
                Our Core Values
              </p>
              <h2 className="section-heading">What We Stand For</h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <AnimatedSection key={v.title} delay={i * 80}>
                  <div className="bg-surface-2 rounded-2xl p-6 border border-ink/8 hover:border-gold/20 transition-all duration-300 group h-full">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                      <Icon className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="text-ink font-bold text-base mb-3">
                      {v.title}
                    </h3>
                    <p className="text-silver text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">
                Our Journey
              </p>
              <h2 className="section-heading">10 Years of Excellence</h2>
            </div>
          </AnimatedSection>

          <div className="relative">
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold/20 to-transparent" />

            <div className="space-y-8">
              {milestones.map((m, i) => (
                <AnimatedSection key={m.year} delay={i * 70}>
                  <div
                    className={`relative flex items-start gap-6 sm:gap-0 ${
                      i % 2 === 0
                        ? "sm:flex-row"
                        : "sm:flex-row-reverse sm:text-right"
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-6 sm:left-1/2 top-3 w-3 h-3 bg-gold rounded-full -translate-x-1.5 sm:-translate-x-1.5 ring-4 ring-dark" />

                    {/* Year */}
                    <div
                      className={`pl-14 sm:pl-0 sm:w-1/2 ${
                        i % 2 === 0 ? "sm:pr-10 sm:text-right" : "sm:pl-10"
                      }`}
                    >
                      <span className="text-gold font-bold text-sm">{m.year}</span>
                    </div>

                    {/* Event */}
                    <div
                      className={`hidden sm:block sm:w-1/2 ${
                        i % 2 === 0 ? "sm:pl-10" : "sm:pr-10 sm:text-left"
                      }`}
                    >
                      <p className="text-ink text-sm font-medium">{m.event}</p>
                    </div>
                    <p className="sm:hidden text-ink text-sm font-medium">
                      {m.event}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 sm:py-24 bg-surface-2/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">
                The People Behind JMK
              </p>
              <h2 className="section-heading">Meet Our Team</h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {team.map((member, i) => (
              <AnimatedSection key={member.name} delay={i * 100}>
                <div className="bg-surface-2 rounded-2xl overflow-hidden border border-ink/8 hover:border-gold/20 transition-all duration-300 group">
                  <div className="relative h-56">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-ink font-bold">{member.name}</h3>
                    <p className="text-gold text-xs font-semibold uppercase tracking-wider mb-3">
                      {member.role}
                    </p>
                    <p className="text-silver text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
