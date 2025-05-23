"use client"

import type React from "react"

import { useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, MessageSquare, ArrowRight, Shield } from "lucide-react"
import { motion, useInView } from "framer-motion"

export function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return

    const rect = sectionRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    setMousePosition({ x, y })
  }

  return (
    <div
      ref={sectionRef}
      className="py-32 min-h-screen flex items-center relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Eagle Shield Background */}
      <motion.div
        className="absolute inset-0 opacity-5 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 0.05 : 0 }}
        transition={{ duration: 1 }}
      >
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M500 0L1000 250L500 500L0 250L500 0Z" fill="currentColor" className="text-primary" />
          <path d="M500 500L1000 750L500 1000L0 750L500 500Z" fill="currentColor" className="text-primary" />
        </svg>
      </motion.div>

      {/* Dynamic background gradient that follows mouse */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(184, 134, 11, 0.3), rgba(184, 134, 11, 0.1) 50%, transparent)`,
          opacity: isHovered ? 1 : 0.5,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Decorative blobs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/15 blur-3xl opacity-40"
        animate={{
          x: isHovered ? mousePosition.x * -50 : 0,
          y: isHovered ? mousePosition.y * -50 : 0,
          scale: isInView ? [1, 1.1, 1] : 0.8,
        }}
        transition={{
          x: { duration: 0.5 },
          y: { duration: 0.5 },
          scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-primary/15 blur-3xl opacity-30"
        animate={{
          x: isHovered ? mousePosition.x * 50 : 0,
          y: isHovered ? mousePosition.y * 50 : 0,
          scale: isInView ? [1, 1.2, 1] : 0.8,
        }}
        transition={{
          x: { duration: 0.5 },
          y: { duration: 0.5 },
          scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0.5 },
        }}
      />

      <div className=" mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center space-y-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
        >
          {/* Eagle Shield Icon */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Shield className="h-16 w-16 text-primary/80" />
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold"
            initial={{ backgroundPosition: "0% 0%" }}
            animate={{
              backgroundPosition: isInView ? "100% 0%" : "0% 0%",
              backgroundImage: "linear-gradient(to right, hsl(var(--primary)), hsl(var(--primary) / 0.8), hsl(var(--primary)))",
              backgroundSize: "200% auto",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            Ready to Start Your Immigration Journey?
          </motion.h2>

          <motion.p
            className="text-xl text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Schedule a consultation with our expert team to discuss your immigration needs and goals.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-8 justify-center pt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="gap-3 rounded-full px-10 py-8 hover-glow group relative overflow-hidden text-lg shadow-lg shadow-primary/20"
                asChild
              >
                <Link href="/contact">
                  <motion.span
                    className="absolute inset-0 bg-primary/10 rounded-full"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <Calendar className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                  <span className="relative z-10">Schedule a Consultation</span>
                  <motion.span
                    className="absolute bottom-0 left-0 h-1 bg-primary/50"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="gap-3 rounded-full px-10 py-8 backdrop-blur-sm bg-background/10 group text-lg"
                asChild
              >
                <Link href="/contact">
                  <motion.span
                    className="absolute inset-0 bg-primary/5 rounded-full"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <MessageSquare className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                  <span className="relative z-10">Contact Us</span>
                  <motion.div
                    className="absolute right-8 opacity-0 group-hover:opacity-100"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
