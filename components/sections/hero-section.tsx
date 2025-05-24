"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown, Shield, FileText } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTheme } from "next-themes"

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const translateY = useTransform(scrollY, [0, 400], [0, 100])

  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const currentTheme = theme || 'dark'

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const parallaxStyle = {
    transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`,
    transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
  }

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden max-w-[100vw]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <motion.div style={{ ...parallaxStyle }} className="w-full h-full">
          {mounted && (
            <Image
              src={currentTheme === 'dark' ? '/hero/hero_dark.png?height=1080&width=1920' : '/hero/hero.png?height=1080&width=1920'}
              alt="Immigration Services"
              fill
              className="object-cover"
              priority
            />
          )}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background" />
      </div>

      {/* Eagle Shield Decorative Elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 rounded-full bg-primary/20 blur-3xl opacity-60"
        animate={{
          x: mousePosition.x * -25,
          y: mousePosition.y * -25,
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 rounded-full bg-primary/15 blur-3xl opacity-40"
        animate={{
          x: mousePosition.x * -15,
          y: mousePosition.y * -15,
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />

      {/* Eagle Shield Emblem */}
      <motion.div
        className="absolute top-1/2 left-1/2 opacity-5 pointer-events-none"
        animate={{
          x: mousePosition.x * -5,
          y: mousePosition.y * -5,
        }}
        style={{
          scale: 2,
          transform: 'translate(-50%, -50%) scale(2)',
          transformOrigin: 'center center',
          maxWidth: '100vw',
          overflow: 'hidden'
        }}
      >
        <Image
          src="/icons/icon-512.png"
          alt="Adeleke Immigration"
          width={200}
          height={200}
          priority
        />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        ref={heroRef}
        className=" mx-auto px-4 pt-24 relative z-10 overflow-hidden"
        style={{ opacity, y: translateY }}
      >
        <div className="max-w-3xl mx-auto text-center space-y-10">
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/icons/icon-512.png"
              alt="Adeleke Immigration"
              width={100}
              height={100}
              priority
            />
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Trusted Immigration
            <motion.span
              className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 block mt-4"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
            >
              Expertise & Guidance
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Professional guidance from Peter E. Adeleke, a retired U.S. Immigration Services Officer with 27 years of
            experience.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button
              size="lg"
              className="rounded-full px-10 py-8 hover-glow text-lg shadow-lg shadow-primary/20 relative overflow-hidden group"
              asChild
            >
              <Link href="/contact" className="flex items-center gap-3">
                <Shield className="h-5 w-5" />
                <span className="relative z-10">Schedule a Consultation</span>
                <motion.span
                  className="absolute inset-0 bg-primary/20 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-10 py-8 backdrop-blur-sm bg-background/10 text-lg group relative overflow-hidden"
              asChild
            >
              <Link href="/services" className="flex items-center gap-3">
                <FileText className="h-5 w-5" />
                <span className="relative z-10">Our Services</span>
                <motion.div
                  className="hidden group-hover:inline-flex border border-primary rounded-full p-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                >
                  <ArrowRight className="h-5 w-5 font-bold text-primary" fontWeight={"bold"} />
                </motion.div>
                <motion.span
                  className="absolute inset-0 bg-primary/10 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Stats with eagle shield styling */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-20 sm:mt-32 mb-20 sm:mb-10 glass rounded-3xl p-6 sm:p-10 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eagle shield background for stats */}
          <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
            <svg width="200" height="100" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 0L200 30L100 60L0 30L100 0Z" fill="currentColor" className="text-primary" />
            </svg>
          </div>

          {[
            { value: "27+", label: "Years Experience" },
            { value: "1000+", label: "Cases Handled" },
            { value: "98%", label: "Success Rate" },
            { value: "24/7", label: "Client Support" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center relative group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0"
                >
                  <path d="M50 0L100 25L50 50L0 25L50 0Z" fill="currentColor" className="text-primary/10" />
                </svg>
              </motion.div>
              {<motion.p
                className="text-2xl sm:text-3xl md:text-5xl font-bold"
                initial={{ color: "slate" }}
                whileHover={{
                  color: "rgba(184, 134, 11, 1)",
                  transition: { duration: 0.3 },
                }}
              >
                {stat.value}
              </motion.p>}
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground mt-2 sm:mt-3">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator with eagle shield styling */}
      <motion.div
        className="absolute bottom-16 sm:bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1.5, duration: 1 }}
        whileHover={{ scale: 1.2 }}
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          })
        }}
      >
        <motion.div
          className="w-8 h-12 sm:w-10 sm:h-16 rounded-full border-2 border-primary/30 flex items-start justify-center p-1 sm:p-2 relative"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        >
          <motion.div
            className="w-1 h-2 sm:w-1.5 sm:h-3 bg-primary rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          />
          <motion.div
            className="absolute -top-3 sm:-top-5 left-1/2 transform -translate-x-1/2"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3 }}
          >
            <svg width="16" height="8" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-5 sm:h-2.5">
              <path d="M10 0L20 5L10 10L0 5L10 0Z" fill="currentColor" className="text-primary" />
            </svg>
          </motion.div>
        </motion.div>
        <motion.div
          className="text-primary/70 text-xs sm:text-sm mt-1 sm:mt-2 text-center"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <ChevronDown className="mx-auto h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Scroll to explore</span>
          <span className="sm:hidden">Scroll</span>
        </motion.div>
      </motion.div>
    </div>
  )
}
