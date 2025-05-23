"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

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
          <svg
            width={isMobile ? "32" : isFooter ? "40" : "48"}
            height={isMobile ? "32" : isFooter ? "40" : "48"}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-accent"
          >
            {/* Gold Circular Background */}
            <circle cx="24" cy="24" r="22" className="fill-accent/5" />
            <circle cx="24" cy="24" r="20" className="fill-accent/10" />

            {/* Outer Gold Ring */}
            <circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeWidth="1" />

            {/* Stylized A for Adeleke */}
            <motion.path
              d="M24 8L34 34H14L24 8Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
              animate={{ strokeWidth: [1.5, 2, 1.5] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            />

            {/* Horizontal Bar in A */}
            <rect x="18" y="24" width="12" height="1.5" fill="currentColor" />

            {/* Gold Stars */}
            <motion.g
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            >
              {/* Top Star */}
              <path d="M24 6L25 8H27L25.5 9L26.5 11L24 10L21.5 11L22.5 9L21 8H23L24 6Z" fill="currentColor" />

              {/* Left Star */}
              <path d="M13 24L14 26H16L14.5 27L15.5 29L13 28L10.5 29L11.5 27L10 26H12L13 24Z" fill="currentColor" />

              {/* Right Star */}
              <path d="M35 24L36 26H38L36.5 27L37.5 29L35 28L32.5 29L33.5 27L32 26H34L35 24Z" fill="currentColor" />

              {/* Bottom Star */}
              <path d="M24 36L25 38H27L25.5 39L26.5 41L24 40L21.5 41L22.5 39L21 38H23L24 36Z" fill="currentColor" />
            </motion.g>
          </svg>

          {/* Animated glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-accent/30 blur-md -z-10"
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
              backgroundImage: "linear-gradient(to right, #F4C430, #F8D35E, #E0B01C, #F4C430)",
              backgroundSize: "300% auto",
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
