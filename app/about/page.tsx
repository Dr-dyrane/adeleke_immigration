"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/layout/page-hero"
import { CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function AboutPage() {
  const values = [
    {
      title: "Integrity",
      description: "Transparency and honesty throughout the process.",
    },
    {
      title: "Empathy",
      description: "Respect for the emotional aspects of immigration.",
    },
    {
      title: "Excellence",
      description: "Providing accurate, professional guidance.",
    },
    {
      title: "Confidentiality",
      description: "Protecting client information with utmost care.",
    },
  ]

  return (
    <div>
      <PageHero
        title="About Adeleke Immigration Services"
        subtitle="Founded on expertise, driven by empathy, committed to your success"
        backgroundImage="/placeholder.svg?height=1080&width=1920"
        height="large"
      />

      <div className=" mx-auto px-4 py-32 min-h-screen flex items-center">
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
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Peter E. Adeleke
            </h2>
            <p className="text-xl text-muted-foreground">Retired U.S. Immigration Services Officer</p>

            <div className="space-y-6">
              <p className="text-lg">
                With 27 years of dedicated service as a U.S. Immigration Services Officer, Peter E. Adeleke brings
                unparalleled expertise and insight to every immigration case.
              </p>

              <p className="text-lg">
                Throughout his distinguished career, Peter has developed a deep understanding of immigration law,
                policies, and procedures. His extensive experience spans across various types of immigration cases, from
                family-based petitions to naturalization applications.
              </p>

              <p className="text-lg">
                After retiring from government service, Peter founded Adeleke Immigration Services with a mission to
                guide individuals and families through the complex immigration landscape with clarity, integrity, and
                compassion.
              </p>
            </div>

            <Button size="lg" className="mt-8 rounded-full px-10 py-8 hover-glow text-lg shadow-lg shadow-primary/20">
              Schedule a Consultation
            </Button>
          </motion.div>
        </div>
      </div>

      <div className=" max-w-6xl mx-auto px-4 py-32 min-h-screen flex items-center">
        <div className="w-full">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Our Core Values
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="glass rounded-3xl p-10 text-center space-y-6 hover-lift"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mx-auto bg-primary/20 w-20 h-20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">{value.title}</h3>
                <p className="text-muted-foreground text-lg">{value.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-32 glass rounded-3xl p-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Our Mission</h2>
            <p className="text-2xl md:text-3xl text-center max-w-4xl mx-auto leading-relaxed">
              "To be the most trusted and approachable immigration advisory brand, simplifying and humanizing the
              immigration journey for immigrants in the U.S. and abroad."
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
