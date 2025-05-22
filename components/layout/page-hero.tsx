"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface PageHeroProps {
  title: string
  subtitle?: string
  backgroundImage?: string
  overlayOpacity?: number
  height?: "small" | "medium" | "large"
  alignment?: "left" | "center" | "right"
  children?: React.ReactNode
}

export function PageHero({
  title,
  subtitle,
  backgroundImage = "/placeholder.svg?height=1080&width=1920",
  overlayOpacity = 0.7,
  height = "medium",
  alignment = "center",
  children,
}: PageHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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
    transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
    transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
  }

  const getHeightClass = () => {
    switch (height) {
      case "small":
        return "min-h-[50vh]"
      case "large":
        return "min-h-screen"
      case "medium":
      default:
        return "min-h-[70vh]"
    }
  }

  const getAlignmentClass = () => {
    switch (alignment) {
      case "left":
        return "text-left items-start"
      case "right":
        return "text-right items-end"
      case "center":
      default:
        return "text-center items-center"
    }
  }

  return (
    <div
      ref={heroRef}
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        getHeightClass(),
        "pt-20", // Add padding for the fixed header
      )}
    >
      {/* Background with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <div style={parallaxStyle} className="w-full h-full">
          <Image
            src={backgroundImage || "/placeholder.svg"}
            alt="Page Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background"
          style={{ opacity: overlayOpacity }}
        />
      </div>

      {/* Decorative Blobs */}
      <div
        className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl opacity-60 animate-float"
        style={{
          animationDelay: "0s",
          transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
        }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-primary/15 blur-3xl opacity-40 animate-float"
        style={{
          animationDelay: "1s",
          transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
        }}
      />

      {/* Hero Content */}
      <div className={cn("container max-w-6xl mx-auto px-4 relative z-10 flex flex-col", getAlignmentClass())}>
        <motion.h1
          className="text-5xl md:text-7xl font-bold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">{title}</span>
        </motion.h1>

        {subtitle && (
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mt-6 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        )}
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
