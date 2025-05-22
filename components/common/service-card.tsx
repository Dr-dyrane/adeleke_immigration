"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface ServiceCardProps {
  service: {
    id: string
    title: string
    description: string
    icon: string
  }
}

export function ServiceCard({ service }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Dynamically get the icon component
  const IconComponent = LucideIcons[service.icon as keyof typeof LucideIcons] || LucideIcons.FileText

  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"
    setIsHovered(false)
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
      <Card
        ref={cardRef}
        className={cn(
          "border-0 shadow-lg overflow-hidden fluid-card transition-all duration-500 h-full",
          isHovered ? "shadow-xl" : "",
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <CardContent className="p-10 relative overflow-hidden h-full">
          {/* Eagle Shield Background */}
          <motion.div
            className="absolute inset-0 opacity-5 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.05 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <svg width="100%" height="100%" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M150 0L300 75L150 150L0 75L150 0Z" fill="currentColor" className="text-primary" />
            </svg>
          </motion.div>

          {/* Background gradient that moves on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* Reveal effect on hover */}
          <motion.div
            className="absolute inset-0 bg-primary/5"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0,
            }}
            style={{
              originX: 0.5,
              originY: 0.5,
              borderRadius: "1.5rem",
            }}
            transition={{ duration: 0.5 }}
          />

          <motion.div
            className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 relative",
              isHovered ? "bg-primary/30" : "bg-primary/20",
            )}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {/* Eagle Shield Icon Background */}
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{ opacity: isHovered ? 0.5 : 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 0L64 16L32 32L0 16L32 0Z" fill="white" />
              </svg>
            </motion.div>

            <IconComponent
              className={cn(
                "h-8 w-8 transition-all duration-500 relative z-10",
                isHovered ? "text-primary" : "text-primary/80",
              )}
            />
          </motion.div>

          <motion.h3
            className={cn("text-2xl font-semibold mb-4 transition-all duration-300", isHovered && "text-primary")}
            initial={{ y: 0 }}
            animate={{ y: isHovered ? -5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {service.title}
          </motion.h3>

          <motion.p
            className={cn(
              "text-muted-foreground transition-all duration-300 text-lg",
              isHovered && "text-foreground/90",
            )}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: isHovered ? 1 : 0.7 }}
            transition={{ duration: 0.3 }}
          >
            {service.description}
          </motion.p>
        </CardContent>

        <CardFooter className="p-10 pt-0">
          <Button
            variant="ghost"
            className={cn("p-0 h-auto group transition-all duration-300", isHovered ? "text-primary" : "")}
            asChild
          >
            <Link href={`/services#${service.id}`} className="flex items-center">
              <span className="relative text-lg">
                Learn More
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: isHovered ? "100%" : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </span>
              <motion.div animate={{ x: isHovered ? 8 : 0 }} transition={{ duration: 0.3 }}>
                <ArrowRight className="ml-3 h-5 w-5" />
              </motion.div>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
