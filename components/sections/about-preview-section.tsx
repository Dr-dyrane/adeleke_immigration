"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export function AboutPreviewSection() {
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

  const listItems = [
    "Expert in U.S. immigration policies and procedures",
    "Specialized knowledge in family-based immigration",
    "Dedicated to client success and satisfaction",
    "Committed to ethical and transparent practices",
  ]

  return (
    <div
      ref={sectionRef}
      className="py-32 min-h-screen flex items-center bg-gradient-to-b from-background/90 via-background to-background/90"
    >
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            className="relative aspect-square md:aspect-auto md:h-[600px] rounded-3xl overflow-hidden shadow-2xl shadow-primary/10"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image src="/placeholder.svg?height=600&width=600" alt="Peter E. Adeleke" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-bold">About Peter E. Adeleke</h2>
            <p className="text-xl text-muted-foreground">
              Retired U.S. Immigration Services Officer with 27 years of experience
            </p>

            <p className="text-lg">
              Throughout his distinguished career, Peter has developed a deep understanding of immigration law,
              policies, and procedures. His extensive experience spans across various types of immigration cases, from
              family-based petitions to naturalization applications.
            </p>

            <ul className="space-y-5">
              {listItems.map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <CheckCircle className="h-6 w-6 text-primary mt-1" />
                  <span className="text-lg">{item}</span>
                </motion.li>
              ))}
            </ul>

            <Button size="lg" className="rounded-full px-8 py-7 mt-8 text-lg shadow-lg shadow-primary/20" asChild>
              <Link href="/about" className="group">
                Learn More About Us
                <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
