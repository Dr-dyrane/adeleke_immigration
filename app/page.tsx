import { HeroSection } from "@/components/sections/hero-section"
import { ServicesSection } from "@/components/sections/services-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { AboutPreviewSection } from "@/components/sections/about-preview-section"
import { CTASection } from "@/components/sections/cta-section"

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <ServicesSection />
      <AboutPreviewSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  )
}
