"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface LogoProps {
  className?: string
  variant?: "default" | "footer" | "mobile"
}

export function Logo({ className, variant = "default" }: LogoProps) {
  const isFooter = variant === "footer"
  const isMobile = variant === "mobile"

  return (
    <Link href="/" className={cn("relative group", className)}>
      <div className="flex items-center gap-2">
        <motion.div className="relative" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
         <Image src="/icons/icon-512.svg" alt="Adeleke Immigration" width={isMobile ? 48 : isFooter ? 52 : 60} height={isMobile ? 48 : isFooter ? 52 : 60} />
          {/* Animated glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/20 blur-md -z-10"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
        </motion.div>

        <div className="flex flex-col">
          <span
            className={cn(
              "font-bold tracking-tight relative z-10",
              isMobile ? "text-xl" : isFooter ? "text-2xl" : "text-2xl",
            )}
          >
            Adeleke
          </span>
          <motion.span
            className={cn(
              "font-bold tracking-tight relative z-10",
              isMobile ? "text-xl" : isFooter ? "text-2xl" : "text-2xl",
            )}
            animate={{
              backgroundImage: "linear-gradient(to right, hsl(var(--primary)), hsl(var(--primary) / 0.8), hsl(var(--primary)))",
              backgroundSize: "200% auto",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              backgroundPosition: ["0% center", "100% center", "0% center"],
            }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
          >
            Immigration
          </motion.span>
        </div>
      </div>

      <motion.span
        className="absolute -bottom-1 left-0 h-0.5 bg-accent"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  )
}
