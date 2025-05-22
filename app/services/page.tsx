"use client"

import { PageHero } from "@/components/layout/page-hero"
import { ServiceCard } from "@/components/common/service-card"
import { CTASection } from "@/components/sections/cta-section"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function ServicesPage() {
  const services = [
    {
      id: "consultation",
      title: "Consultation & Advisory",
      description:
        "Expert guidance on immigration options, requirements, and procedures tailored to your specific situation.",
      icon: "MessageSquare",
    },
    {
      id: "application",
      title: "Application Assistance",
      description:
        "Comprehensive support in preparing and submitting immigration applications with accuracy and attention to detail.",
      icon: "FileText",
    },
    {
      id: "document-review",
      title: "Document Review & Case Evaluation",
      description:
        "Thorough assessment of your documentation and case details to identify potential issues and optimize outcomes.",
      icon: "Search",
    },
    {
      id: "work-authorization",
      title: "Work Authorization & Residency Support",
      description: "Specialized assistance for employment-based immigration and permanent residency applications.",
      icon: "Briefcase",
    },
    {
      id: "naturalization",
      title: "Naturalization Support",
      description:
        "Guidance through the citizenship application process, including preparation for the naturalization interview and test.",
      icon: "Flag",
    },
    {
      id: "waiver",
      title: "Waiver Guidance",
      description:
        "Expert advice on waiver applications for inadmissibility issues and complex immigration challenges.",
      icon: "ShieldCheck",
    },
    {
      id: "family-petition",
      title: "Family-Based Petition Filing",
      description: "Assistance with petitions for family members, including spouses, children, parents, and siblings.",
      icon: "Users",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <div>
      <PageHero
        title="Our Services"
        subtitle="Professional immigration advisory and documentation support tailored to your unique needs"
        backgroundImage="/placeholder.svg?height=1080&width=1920"
        height="large"
      >
        <Button size="lg" className="rounded-full px-10 py-8 hover-glow text-lg shadow-lg shadow-primary/20" asChild>
          <Link href="#services" className="group">
            Explore Services
            <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
          </Link>
        </Button>
      </PageHero>

      <div id="services" className="container max-w-6xl mx-auto px-4 py-32 min-h-screen flex items-center">
        <div className="w-full">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Comprehensive Immigration Services
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {services.map((service) => (
              <motion.div key={service.id} variants={item}>
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <CTASection />
    </div>
  )
}
