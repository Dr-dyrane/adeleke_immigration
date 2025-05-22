"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ServiceCard } from "@/components/common/service-card"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const featuredServices = [
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
    <div
      ref={sectionRef}
      className="py-32 min-h-screen flex items-center bg-gradient-to-b from-background via-background/95 to-background/90"
    >
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional immigration advisory and documentation support for your unique needs.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {featuredServices.map((service) => (
            <motion.div key={service.id} variants={item}>
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button size="lg" variant="outline" className="rounded-full px-8 py-7 text-lg" asChild>
            <Link href="/services" className="group">
              View All Services
              <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
