"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown, Shield, FileText } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const translateY = useTransform(scrollY, [0, 400], [0, 100])

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
    transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
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
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Immigration Services"
            fill
            className="object-cover"
            priority
          />
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
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none"
        animate={{
          x: mousePosition.x * -5,
          y: mousePosition.y * -5,
        }}
        style={{
          scale: 2,
          maxWidth: '100vw',
          overflow: 'hidden'
        }}
      >
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M100 20C55.8172 20 20 55.8172 20 100C20 144.183 55.8172 180 100 180C144.183 180 180 144.183 180 100C180 55.8172 144.183 20 100 20Z"
            fill="currentColor"
            className="text-primary"
          />
          <path
            d="M160 80C160 80 140 60 100 60C60 60 40 80 40 80C40 80 60 50 100 50C140 50 160 80 160 80Z"
            fill="white"
          />
          <path d="M100 70C83.4315 70 70 83.4315 70 100V140H130V100C130 83.4315 116.569 70 100 70Z" fill="white" />
          <path
            d="M100 60C94.4772 60 90 64.4772 90 70C90 75.5228 94.4772 80 100 80C105.523 80 110 75.5228 110 70C110 64.4772 105.523 60 100 60Z"
            fill="white"
          />
          <path
            d="M100 90C96.134 90 93 93.134 93 97V120H107V97C107 93.134 103.866 90 100 90Z"
            fill="currentColor"
            className="text-primary"
          />
          <circle cx="85" cy="100" r="3" fill="currentColor" className="text-primary" />
          <circle cx="115" cy="100" r="3" fill="currentColor" className="text-primary" />
          <circle cx="100" cy="100" r="3" fill="currentColor" className="text-primary" />
        </svg>
      </motion.div>

      {/* Hero Content */}
      <motion.div
        ref={heroRef}
        className="container max-w-6xl mx-auto px-4 pt-24 relative z-10 overflow-hidden"
        style={{ opacity, y: translateY }}
      >
        <div className="max-w-3xl mx-auto text-center space-y-10">
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                d="M40 10C23.4315 10 10 23.4315 10 40C10 56.5685 23.4315 70 40 70C56.5685 70 70 56.5685 70 40C70 23.4315 56.5685 10 40 10Z"
                fill="currentColor"
                className="text-primary/10"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              />
              <motion.path
                d="M65 35C65 35 55 25 40 25C25 25 15 35 15 35C15 35 25 20 40 20C55 20 65 35 65 35Z"
                fill="currentColor"
                className="text-primary"
                animate={{
                  d: [
                    "M65 35C65 35 55 25 40 25C25 25 15 35 15 35C15 35 25 20 40 20C55 20 65 35 65 35Z",
                    "M70 32C70 32 55 22 40 22C25 22 10 32 10 32C10 32 25 17 40 17C55 17 70 32 70 32Z",
                    "M65 35C65 35 55 25 40 25C25 25 15 35 15 35C15 35 25 20 40 20C55 20 65 35 65 35Z",
                  ],
                }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              />
              <path
                d="M40 30C33.3726 30 28 35.3726 28 42V55H52V42C52 35.3726 46.6274 30 40 30Z"
                fill="currentColor"
                className="text-primary"
              />
              <path
                d="M40 25C37.7909 25 36 26.7909 36 29C36 31.2091 37.7909 33 40 33C42.2091 33 44 31.2091 44 29C44 26.7909 42.2091 25 40 25Z"
                fill="currentColor"
                className="text-primary"
              />
              <path d="M40 37C38.3431 37 37 38.3431 37 40V48H43V40C43 38.3431 41.6569 37 40 37Z" fill="white" />
              <motion.g
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              >
                <circle cx="35" cy="42" r="1.5" fill="white" />
                <circle cx="45" cy="42" r="1.5" fill="white" />
                <circle cx="40" cy="42" r="1.5" fill="white" />
              </motion.g>
            </svg>
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
                <ArrowRight className="ml-1 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
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
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-20 sm:mt-32 glass rounded-3xl p-6 sm:p-10 relative overflow-hidden"
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
              <motion.p
                className="text-3xl md:text-5xl font-bold"
                initial={{ color: "#888" }}
                whileHover={{
                  color: "rgba(59, 130, 246, 1)",
                  transition: { duration: 0.3 },
                }}
              >
                {stat.value}
              </motion.p>
              <p className="text-sm md:text-base text-muted-foreground mt-3">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator with eagle shield styling */}
      <motion.div
        className="absolute bottom-5 sm:bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
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
          className="w-10 h-16 rounded-full border-2 border-primary/30 flex items-start justify-center p-2 relative"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        >
          <motion.div
            className="w-1.5 h-3 bg-primary rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          />
          <motion.div
            className="absolute -top-5 left-1/2 transform -translate-x-1/2"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3 }}
          >
            <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 0L20 5L10 10L0 5L10 0Z" fill="currentColor" className="text-primary" />
            </svg>
          </motion.div>
        </motion.div>
        <motion.div
          className="text-primary/70 text-sm mt-2 text-center"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <ChevronDown className="mx-auto h-4 w-4" />
          Scroll to explore
        </motion.div>
      </motion.div>
    </div>
  )
}
