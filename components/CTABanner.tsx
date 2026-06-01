import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

export default function CTABanner() {
  return (
    <section className="py-20 sm:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-3 to-dark" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold/8 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-red/8 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      </div>

      {/* Gold top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
            Ready to Drive?
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ink leading-tight font-display mb-6">
            Your Dream Car Is
            <span className="gold-text block mt-2">Waiting for You</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <p className="text-silver-light text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Browse over 15 premium imported vehicles or tell us exactly what you
            want and we&apos;ll source it for you. No stress. No hidden fees.
            Just your perfect car.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cars"
              className="btn-red px-10 py-4 rounded-xl text-base font-semibold inline-flex items-center justify-center gap-2 group"
            >
              Browse All Cars
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="tel:+2348012345678"
              className="btn-outline px-10 py-4 rounded-xl text-base inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Us Now
            </a>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={400}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-silver text-sm">
            {[
              "✓ No Hidden Charges",
              "✓ Full Documentation",
              "✓ Nationwide Delivery",
              "✓ After-Sale Support",
            ].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                {item}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
