import type { Metadata } from "next";
import Hero from "@/components/Hero";
import QuickSearch from "@/components/QuickSearch";
import FeaturedCars from "@/components/FeaturedCars";
import WhyChooseJMK from "@/components/WhyChooseJMK";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "JMK Auto | Premium Imported Cars in Nigeria",
  description:
    "Browse our premium selection of Foreign Used, Tokunbo, and Brand New imported cars. Toyota, Lexus, Mercedes-Benz, BMW, Range Rover and more. Trusted quality. Best prices.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickSearch />
      <FeaturedCars />
      <WhyChooseJMK />
      <Testimonials />
      <CTABanner />
    </>
  );
}
